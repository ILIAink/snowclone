# IT Knowledge Base: VPN Troubleshooting

**Document ID:** KB-005
**Category:** Networking, Remote Access
**Keywords:** VPN, Virtual Private Network, Cisco AnyConnect, GlobalProtect, Palo Alto, OpenVPN, Split Tunnel, Authentication Failed

## 1. Overview
This document outlines troubleshooting for the corporate Virtual Private Network (VPN), which allows remote users to securely access internal corporate resources.

## 2. Common Symptoms
* VPN client fails to connect or times out.
* "Authentication failed" error.
* VPN connects successfully, but the user cannot access internal sites (e.g., Intranet, internal file shares).
* Internet speed drops drastically when connected.

## 3. Resolution Steps

### A. Pre-Requisite Checks
1. Verify the user has a working internet connection (can they reach `google.com`?).
2. Verify the correct VPN portal address is entered (e.g., `vpn.company.com`).
3. Ensure the user's AD password is not expired and they have their MFA device ready.

### B. Client-Side Troubleshooting
1. **Restart the VPN Service/App:** Fully quit the application (e.g., right-click Cisco AnyConnect in system tray -> Quit) and reopen it.
2. **Clear VPN Cache:**
   * *GlobalProtect:* Delete the folder `%localappdata%\Palo Alto Networks\GlobalProtect`.
3. **Reinstall Client:** If the app crashes or fails to update, uninstall via Control Panel, reboot, and download the latest installer from the software portal or public VPN gateway.

### C. Connected, but No Access to Internal Resources (Routing/DNS Issues)
If the VPN shows "Connected" but pinging an internal server fails:
1. **Flush DNS:** Open CMD as Admin -> `ipconfig /flushdns`.
2. **Check IP configuration:** Run `ipconfig /all`. Ensure the VPN Virtual Adapter has received an internal IP address (e.g., `10.x.x.x`) and internal DNS servers are listed.
3. **Conflicting Home Subnets:** If the user's home network uses the exact same subnet as the corporate network (e.g., `192.168.1.x`), routing conflicts will occur.
   * *Fix:* User must log into their home router and change their local LAN subnet (e.g., to `192.168.50.x`), or rely on IT to implement NAT policies.

### D. Authentication Failures
1. Ensure the user is approving the MFA prompt. Sometimes push notifications are delayed; instruct the user to open the Authenticator app manually to check for pending requests.
2. If the user recently changed their password, they must use the new password.
3. Check AD account status (is the account locked out? See KB-001).

### E. Split Tunneling vs Full Tunneling
* **Split Tunnel:** Only traffic destined for corporate IPs goes through the VPN. Internet traffic (Zoom, YouTube) goes out the user's local ISP.
* **Full Tunnel:** ALL traffic goes through the VPN. If a user complains about slow Zoom calls while on VPN, verify if they are on a full-tunnel profile. If appropriate, move them to a split-tunnel profile.

## 4. Escalation Path
* Connection times out for multiple users simultaneously -> Possible VPN gateway/firewall outage. Escalate to **Network Security / Network Engineering**.
* User cannot access a *specific* internal server while on VPN, but others can -> Check firewall access control lists (ACLs) or user group memberships. Escalate to **Tier 2 / Security**.# IT Knowledge Base: VPN Troubleshooting

**Document ID:** KB-005
**Category:** Networking, Remote Access
**Keywords:** VPN, Virtual Private Network, Cisco AnyConnect, GlobalProtect, Palo Alto, OpenVPN, Split Tunnel, Authentication Failed

## 1. Overview
This document outlines troubleshooting for the corporate Virtual Private Network (VPN), which allows remote users to securely access internal corporate resources.

## 2. Common Symptoms
* VPN client fails to connect or times out.
* "Authentication failed" error.
* VPN connects successfully, but the user cannot access internal sites (e.g., Intranet, internal file shares).
* Internet speed drops drastically when connected.

## 3. Resolution Steps

### A. Pre-Requisite Checks
1. Verify the user has a working internet connection (can they reach `google.com`?).
2. Verify the correct VPN portal address is entered (e.g., `vpn.company.com`).
3. Ensure the user's AD password is not expired and they have their MFA device ready.

### B. Client-Side Troubleshooting
1. **Restart the VPN Service/App:** Fully quit the application (e.g., right-click Cisco AnyConnect in system tray -> Quit) and reopen it.
2. **Clear VPN Cache:**
   * *GlobalProtect:* Delete the folder `%localappdata%\Palo Alto Networks\GlobalProtect`.
3. **Reinstall Client:** If the app crashes or fails to update, uninstall via Control Panel, reboot, and download the latest installer from the software portal or public VPN gateway.

### C. Connected, but No Access to Internal Resources (Routing/DNS Issues)
If the VPN shows "Connected" but pinging an internal server fails:
1. **Flush DNS:** Open CMD as Admin -> `ipconfig /flushdns`.
2. **Check IP configuration:** Run `ipconfig /all`. Ensure the VPN Virtual Adapter has received an internal IP address (e.g., `10.x.x.x`) and internal DNS servers are listed.
3. **Conflicting Home Subnets:** If the user's home network uses the exact same subnet as the corporate network (e.g., `192.168.1.x`), routing conflicts will occur.
   * *Fix:* User must log into their home router and change their local LAN subnet (e.g., to `192.168.50.x`), or rely on IT to implement NAT policies.

### D. Authentication Failures
1. Ensure the user is approving the MFA prompt. Sometimes push notifications are delayed; instruct the user to open the Authenticator app manually to check for pending requests.
2. If the user recently changed their password, they must use the new password.
3. Check AD account status (is the account locked out? See KB-001).

### E. Split Tunneling vs Full Tunneling
* **Split Tunnel:** Only traffic destined for corporate IPs goes through the VPN. Internet traffic (Zoom, YouTube) goes out the user's local ISP.
* **Full Tunnel:** ALL traffic goes through the VPN. If a user complains about slow Zoom calls while on VPN, verify if they are on a full-tunnel profile. If appropriate, move them to a split-tunnel profile.

## 4. Escalation Path
* Connection times out for multiple users simultaneously -> Possible VPN gateway/firewall outage. Escalate to **Network Security / Network Engineering**.
* User cannot access a *specific* internal server while on VPN, but others can -> Check firewall access control lists (ACLs) or user group memberships. Escalate to **Tier 2 / Security**.