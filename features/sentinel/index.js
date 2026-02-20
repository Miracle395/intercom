class Sentinel {
  constructor(peer, { timeout = 60000 } = {}) {
    this.peer = peer;
    this.timeout = timeout;
    this.peers = new Map();
    this.interval = null;
  }

  start() {
    console.log('[Sentinel] Starting peer liveness monitor...');

    // Monitor sidechannel messages
    const originalOnMessage = this.peer.sidechannel?.opts?.onMessage;

    this.peer.sidechannel.opts.onMessage = (channel, payload, connection) => {
      const peerKey = connection?.remotePublicKey?.toString('hex');
      if (peerKey) {
        this.updatePeer(peerKey);
      }

      if (typeof originalOnMessage === 'function') {
        originalOnMessage(channel, payload, connection);
      }
    };

    // Periodic health check
    this.interval = setInterval(() => {
      this.checkPeers();
    }, 15000);
  }

  updatePeer(peerKey) {
    this.peers.set(peerKey, {
      lastSeen: Date.now(),
      status: 'ALIVE'
    });
  }

  checkPeers() {
    const now = Date.now();
    for (const [key, data] of this.peers.entries()) {
      if (now - data.lastSeen > this.timeout) {
        data.status = 'DEAD';
      }
    }
    this.printStatus();
  }

  printStatus() {
    console.log('\n=== Sentinel Status ===');
    for (const [key, data] of this.peers.entries()) {
      console.log(
        `${key.slice(0, 12)}... | ${data.status} | lastSeen: ${new Date(data.lastSeen).toLocaleTimeString()}`
      );
    }
  }
}

export default Sentinel;
