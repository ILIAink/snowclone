# IT Knowledge Base: Multi-Factor Authentication (MFA) Reset

**Document ID:** KB-003
**Category:** Identity & Access Management (IAM), Security
**Keywords:** MFA, 2FA, Authenticator App, New Phone, Lost Phone, Microsoft Authenticator, Okta Verify, Duo, OTP

## 1. Overview
This procedure defines the steps for resetting Multi-Factor Authentication (MFA) for users who have acquired a new mobile device, lost their device, or accidentally deleted their authenticator application.

## 2. Common Symptoms
* User cannot log in because they are not receiving push notifications.
* User has a new phone and their old Authenticator app did not transfer settings.
* User accidentally deleted the Authenticator app.
* User lost their physical hardware token (YubiKey).

## 3. Security Prerequisites (Identity Verification)
**CRITICAL:** Resetting MFA bypasses a core security control. Verification MUST be stringent.
* Manager verification via Slack/Teams or Phone.
* IT Video Call verification (must see the user's face and verify against photo ID / employee directory).

## 4. Resolution Steps

### A. Scenario: User has a new phone (but still has the old phone)
1. Instruct the user NOT to wipe the old phone yet.
2. Have the user navigate to the security info page (e.g., `mysignins.microsoft.com/security-info` for Azure AD).
3. Log in using the MFA prompt on the *old* phone.
4. Click **Add sign-in method** -> Choose **Authenticator app**.
5. Follow the on-screen QR code process using the app on the *new* phone.
6. Once added, test the new phone. If successful, they can delete the old phone from the portal.

### B. Scenario: User lost phone or deleted the app (No access to old MFA)
*Helpdesk intervention is required.*
**For Azure AD / Entra ID:**
1. Open the **Entra admin center** (entra.microsoft.com).
2. Navigate to **Users > All users** and search for the user.
3. Select the user, then click on **Authentication methods** in the left pane.
4. Click **Require re-register MFA**. This forces the user to set up MFA from scratch on their next login attempt.
5. (Optional but recommended): Delete the old registered device/app from the list to prevent unauthorized access if the phone was stolen.
6. Instruct the user to log in on their computer; they will be prompted: *"More information required"*. They should follow the prompts to scan the new QR code.

**For Okta (If applicable):**
1. Find the user in the Okta Admin Dashboard.
2. Click **More Actions -> Reset Authenticators**.
3. Select the specific factor (e.g., Okta Verify) and reset it.

### C. Hardware Token Provisioning (YubiKey / RSA)
If a user cannot use a personal mobile device for MFA:
1. Obtain an unassigned hardware token from IT inventory.
2. Log into the IAM portal and assign the token's serial number to the user's profile.
3. Distribute the token to the user and provide instructions on how to use it (e.g., touching the gold contact for YubiKey).

## 5. Escalation Path
* Suspicious MFA reset requests or multiple failed attempts -> Escalate immediately to **Security Operations Center (SOC)**.
* IAM Portal errors preventing MFA reset -> Escalate to **Tier 2 / Identity Team**.