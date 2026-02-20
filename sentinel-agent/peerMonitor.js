class PeerMonitor {
  constructor(timeoutMs = 60000) {
    this.peers = new Map();
    this.timeoutMs = timeoutMs;
  }

  registerPeer(peerId) {
    this.peers.set(peerId, {
      lastSeen: Date.now(),
      status: "ALIVE"
    });
  }

  updatePeer(peerId) {
    if (!this.peers.has(peerId)) {
      this.registerPeer(peerId);
    } else {
      this.peers.get(peerId).lastSeen = Date.now();
      this.peers.get(peerId).status = "ALIVE";
    }
  }

  checkPeers() {
    const now = Date.now();
    for (const [peerId, data] of this.peers.entries()) {
      if (now - data.lastSeen > this.timeoutMs) {
        data.status = "DEAD";
      }
    }
  }

  getAllPeers() {
    return Array.from(this.peers.entries()).map(([id, data]) => ({
      peerId: id,
      ...data
    }));
  }

  getPeer(peerId) {
    return this.peers.get(peerId);
  }
}

module.exports = PeerMonitor;
