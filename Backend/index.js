  const express = require('express');
  const cors = require('cors');
  const mongoose = require('mongoose');
  require('dotenv').config();

  const app = express();
  const PORT = process.env.PORT || 4000; // ✅ fixed for cloud

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('🟢 Rexion backend is live!');
  });

  // ✅ MongoDB Connect
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.once("open", () => console.log("✅ MongoDB Connected"));

  // ✅ Wallet Schema
  const walletSchema = new mongoose.Schema({
    address: { type: String, unique: true },
    rexion: { type: Number, default: 0 },
    nodeRunning: { type: Boolean, default: false },
  });
  const Wallet = mongoose.model('Wallet', walletSchema);

  // ✅ In-Memory intervals map
  const miningIntervals = {}; // address: setInterval ref

  // ✅ Start Node
  app.post('/start-node', async (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "No wallet address" });

    let wallet = await Wallet.findOne({ address });

    if (!wallet) {
      wallet = await Wallet.create({ address, rexion: 0, nodeRunning: true });
    } else {
      if (wallet.nodeRunning) {
        return res.json({
          message: "Node already running",
          rexion: parseFloat(wallet.rexion.toFixed(2))
        });
      }
      wallet.nodeRunning = true;
      await wallet.save();
    }

    // ✅ Start mining interval (0.05 REX per second)
    miningIntervals[address] = setInterval(async () => {
      const user = await Wallet.findOne({ address });
      if (user && user.nodeRunning) {
        user.rexion = parseFloat((user.rexion + 0.05).toFixed(4)); // Save internally with more precision
        await user.save();
      }
    }, 1000); // 1 second

    console.log(`✅ Node started for ${address}`);
    res.json({
      message: "Node started",
      rexion: parseFloat(wallet.rexion.toFixed(2))
    });
  });

  // ✅ Stop Node
  app.post('/stop-node', async (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "No wallet address" });

    const wallet = await Wallet.findOne({ address });

    if (!wallet || !wallet.nodeRunning) {
      return res.json({ message: "Node already stopped" });
    }

    wallet.nodeRunning = false;
    await wallet.save();

    if (miningIntervals[address]) {
      clearInterval(miningIntervals[address]);
      delete miningIntervals[address];
    }

    console.log(`🛑 Node stopped for ${address}`);
    res.json({ message: "Node stopped" });
  });

  // ✅ Save Wallet (on connect)
  app.post('/save-wallet', async (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "No address provided" });

    let wallet = await Wallet.findOne({ address });
    if (!wallet) {
      wallet = await Wallet.create({ address, rexion: 0, nodeRunning: false });
    }

    res.json({
      message: 'Wallet saved',
      rexion: parseFloat(wallet.rexion.toFixed(2))
    });
  });

  // ✅ Status (per wallet)
  app.get('/status/:address', async (req, res) => {
    const address = req.params.address;
    if (!address) return res.status(400).json({ error: "No wallet address" });

    const wallet = await Wallet.findOne({ address });
    if (!wallet) return res.json({ running: false, rexion: 0 });

    res.json({
      running: wallet.nodeRunning,
      rexion: parseFloat(wallet.rexion.toFixed(2))
    });
  });

  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`🔥 Backend running at http://localhost:${PORT}`);
  });