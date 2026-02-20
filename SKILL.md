# name: Intercom Sentinel.

## Description

Intercom Sentinel introduces peer liveness monitoring into the Intercom runtime.

It tracks real peer activity by observing sidechannel message flow and updates heartbeat status in real time.

Peers inactive beyond the configured timeout are marked as DEAD.


## Agent Instructions

1. Start Intercom normally.
2. Sentinel automatically initializes during runtime.
3. Monitor terminal output for:

   === Sentinel Status ===

4. Observe peer keys and their status:
   - ALIVE
   - DEAD

No additional configuration required.


## Timeout Configuration

Default timeout: 60 seconds

To modify:

new Sentinel(peer, { timeout: <milliseconds> })
