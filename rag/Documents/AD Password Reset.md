# IT Knowledge Base: Active Directory (AD) Password Reset

**Document ID:** KB-001
**Category:** Identity & Access Management (IAM)
**Keywords:** Active Directory, AD, Password Reset, Locked Out, Account Lockout, SSPR, Login Failed, Entra ID, Azure AD

## 1. Overview
This document outlines the standard operating procedure for troubleshooting and resolving Active Directory (AD) password and account lockout issues for end-users.

## 2. Common Symptoms
* User receives "Incorrect username or password" error.
* User receives "Your account has been locked. Contact your support person to unlock it."
* User is continually prompted for credentials in Outlook/Teams despite entering the correct password.
* Password expired prompt at Windows logon.

## 3. Security Prerequisites (Identity Verification)
**CRITICAL:** Before resetting any password manually, the Helpdesk Agent MUST verify the user's identity.
* **Method 1 (Preferred):** Manager verification (call the user's direct manager).
* **Method 2:** Verification via an established security PIN or secondary contact number listed in the HR system.
* **Method 3:** Video call verification (e.g., Zoom/Teams) if the user has access on a mobile device.

## 4. Resolution Steps

### A. Self-Service Password Reset (SSPR)
Encourage users to use SSPR if they have previously registered.
1. Direct the user to `passwordreset.microsoftonline.com` (or company equivalent).
2. User enters their email address and solves the CAPTCHA.
3. User selects their verification method (Authenticator App, SMS, Alternate Email).
4. Upon successful verification, user inputs a new password.

### B. Helpdesk Manual Password Reset (via ADUC)
If SSPR is unavailable or the user is locked out of all devices:
1. Open **Active Directory Users and Computers (ADUC)**.
2. Search for the user's SAMAccountName or First/Last name.
3. Right-click the user object and select **Reset Password**.
4. Enter a temporary password (must meet complexity requirements).
5. **Important:** Check the box for **"User must change password at next logon"**.
6. Uncheck **"Account is disabled"** if applicable.
7. Click **OK**.
8. Provide the temporary password to the user securely (e.g., verbally over the phone).

### C. Unlocking an Account (Without Password Reset)
1. In ADUC, right-click the user object and select **Properties**.
2. Go to the **Account** tab.
3. Check if the **"Unlock account. This account is currently locked out on this Active Directory Domain Controller"** box is visible/checked.
4. Check the box to unlock, click **Apply**, then **OK**.

### D. Cached Credentials (Remote Users)
If the user is remote and not on the VPN, their laptop relies on cached credentials.
1. The user must log into the laptop using their *OLD* password.
2. Once logged in, connect to the corporate VPN.
3. Lock the computer (Windows Key + L).
4. Unlock the computer using the *NEW* password. This updates the local cached credentials.

## 5. Escalation Path
* If AD replication fails (password works in one app but not another after 30 minutes) -> Escalate to **Tier 2 / IAM Team**.
* If the account continuously locks out immediately after unlocking -> Suspect stale credentials on mobile devices, scheduled tasks, or services. Escalate to **Tier 2 for lockout trace**.