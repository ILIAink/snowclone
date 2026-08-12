# IT Knowledge Base: Application Installation and Approved Software

**Document ID:** KB-007
**Category:** Software, Endpoint Management
**Keywords:** Install, Approved Software, Software Center, Company Portal, Jamf, Admin Rights, UAC, Endpoint, Blocked

## 1. Overview
This document details how users can install approved software, how to troubleshoot failed installations, and the process for requesting unapproved software. Most users do not have Local Administrator rights; therefore, software must be managed centrally.

## 2. Approved Software List & Self-Service
To maintain security and compliance, IT maintains an approved list of applications that are pre-packaged and available for self-service installation without requiring admin credentials.

**Common Approved Software:**
* **Productivity:** Microsoft 365 Apps (Word, Excel, PPT), Adobe Acrobat Reader
* **Communication:** Slack, Microsoft Teams, Zoom
* **Browsers:** Google Chrome, Mozilla Firefox, Microsoft Edge
* **Development (Role-Specific):** VS Code, Git, Docker Desktop, Postman

### How to Install (Self-Service)
* **Windows (Intune/MECM):** Instruct the user to open the **Company Portal** or **Software Center** app from the Start Menu. Search for the app and click **Install**.
* **macOS (Jamf):** Instruct the user to open the **Jamf Self Service** app from the Applications folder. Find the app and click **Install**.

## 3. Troubleshooting Installation Failures

### A. App fails to install from Company Portal / Software Center
1. **Sync Device:** In Company Portal, go to Settings and click **Sync**. Wait 5 minutes and try again.
2. **Disk Space:** Verify the device has enough free storage space. Minimum 10% free space is recommended.
3. **Network:** Ensure the device is connected to a stable network (some large apps like Adobe Creative Cloud will timeout on slow home Wi-Fi).
4. **Clear Cache (Windows):** Open CMD as Admin and run `net stop ccmexec`, clear `C:\Windows\ccmcache`, and run `net start ccmexec`.

### B. User Prompted for Admin Credentials (UAC)
If a user tries to download an `.exe` or `.msi` directly from the internet, they will be blocked by User Account Control (UAC).
1. Verify if the software is on the Approved List.
2. If it IS approved, direct them to use the Self-Service portal (see Section 2).
3. If the self-service version is broken, a Helpdesk agent can temporarily elevate privileges via LAPS (Local Administrator Password Solution) or enter their own admin credentials via remote session to perform the install.

### C. Conflicting Software
* Ensure previous versions of the software are fully uninstalled before installing a new version.
* Check if Antivirus/EDR (e.g., CrowdStrike, SentinelOne) is blocking the installer. Check the security console for block events.

## 4. Requesting Unapproved Software (Exception Process)
If a user requires software that is not in the Self-Service portal:
1. Do **NOT** bypass controls to install it immediately.
2. Instruct the user to submit a **Software Request Ticket**.
3. The ticket must include:
   * Software name and vendor.
   * Business justification.
   * Cost/Licensing model.
4. **Workflow:** 
   * Manager Approval -> Security Review (Risk Assessment) -> IT Packaging Team.
5. Once approved and packaged, the app will be pushed to the user's Company Portal.

## 5. Escalation Path
* App installation consistently fails in Company Portal across multiple users -> Escalate to **Endpoint Management / SCCM / Intune Admins** (the package may be corrupt or the deployment script failed).
* Security blocks a legitimate business application -> Escalate to the **Security Operations (SecOps)** team to add an exclusion or review the risk.