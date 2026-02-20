const PeerMonitor = require("./peerMonitor");

// NOTE:
// We assume upstream intercom main index.js exports the agent.
// If structure differs, this still demonstrates valid integration logic.

const monitor = new PeerMonitor(60000);

// Simulated integration layer
// Replace with actual intercom event hooks if needed

function simulatePeerActivity() {
  const samplePeers = ["agent-A", "agent-B", "agent-C"];

  setInterval(() => {
    const randomPeer = samplePeers[Math.floor(Math.random() * samplePeers.length)];
    monitor.updatePeer(randomPeer);
  }, 5000);

  setInterval(() => {
    monitor.checkPeers();
  }, 15000);
}

function displayStatus() {
  setInterval(() => {
    console.clear();
    console.log("=== Intercom Sentinel ===");
    console.log("Peer Health Overview\n");

    const peers = monitor.getAllPeers();

    if (peers.length === 0) {
      console.log("No peers registered yet.");
    } else {
      peers.forEach(p => {
        console.log(
          `${p.peerId} | ${p.status} | lastSeen: ${new Date(p.lastSeen).toLocaleTimeString()}`
        );
      });
    }
  }, 7000);
}

console.log("Starting Intercom Sentinel...");
simulatePeerActivity();
displayStatus();
