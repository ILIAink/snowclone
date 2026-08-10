# IT Knowledge Base: Wi-Fi and Network Troubleshooting

**Document ID:** KB-004
**Category:** Networking
**Keywords:** Wi-Fi, Wireless, No Internet, Dropping Connection, 802.1x, Certificate, RADIUS, IP Address, DNS

## 1. Overview
This guide provides troubleshooting steps for remote users connecting to home Wi-Fi and in-office users connecting to the corporate Enterprise Wi-Fi network.

## 2. Common Symptoms
* "No Internet Connection" or yellow triangle over Wi-Fi icon.
* Connected to Wi-Fi but cannot browse web pages.
* Wi-Fi disconnects randomly.
* Cannot authenticate to corporate Wi-Fi (e.g., "Corp-Secure").

## 3. Resolution Steps

### A. Basic Client-Side Checks (Home & Office)
1. Verify **Airplane Mode** is turned OFF.
2. Ensure the physical Wi-Fi switch (on some laptop models) is turned ON.
3. Check if the user is out of range of the router/access point.
4. Restart the computer (fixes 50% of transient adapter issues).

### B. Network Adapter Reset / IP Configuration
If connected but no internet:
1. Open Command Prompt as Administrator.
2. Run the following commands in order:
   * `ipconfig /release` (Releases current IP)
   * `ipconfig /renew` (Requests new IP from DHCP)
   * `ipconfig /flushdns` (Clears DNS cache)
   * `netsh winsock reset` (Resets network stack)
3. Reboot the computer.

### C. Forget and Reconnect to the Network
1. **Windows:** Settings > Network & Internet > Wi-Fi > Manage known networks. Select the network and click **Forget**.
2. **Mac:** System Settings > Wi-Fi > Advanced. Click the three dots next to the network and select **Remove From List**.
3. Re-select the network from the available list and enter the password.

### D. Corporate Wi-Fi (802.1x / Enterprise) Specifics
If failing to connect to the corporate office Wi-Fi:
1. **Certificate Issue:** Ensure the device has the current MDM payload or Root CA certificate installed. If the machine was offline for months, the machine cert may have expired.
2. **AD Password Sync:** If the user recently changed their AD password, Windows might be caching the old one for Wi-Fi authentication. Forget the network (Step C) and reconnect, prompting for new credentials.
3. **Wired connection:** Have the user plug into Ethernet. If Ethernet works but Wi-Fi fails, it isolates the issue to the wireless adapter or RADIUS authentication.

### E. Driver Updates
1. Open **Device Manager** > **Network adapters**.
2. Right-click the Wi-Fi adapter (e.g., Intel Wi-Fi 6 AX201) and select **Update driver**.
3. If heavily corrupted, select **Uninstall device** (do NOT check 'delete driver software' initially), then reboot to let Windows reinstall it.

## 4. Escalation Path
* Multiple users in the office reporting Wi-Fi down -> **Major Incident!** Escalate to **Network Engineering** immediately. Ensure Access Points (APs) are online.
* User at home tried all steps, even Ethernet, and still has no internet -> Instruct user to contact their **ISP (Internet Service Provider)**.
* Machine cert expired/MDM not pushing Wi-Fi profile -> Escalate to **Endpoint Management / Tier 2**.