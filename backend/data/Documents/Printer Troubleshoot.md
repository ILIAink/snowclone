# IT Knowledge Base: Printer and Scanning Troubleshooting

**Document ID:** KB-002
**Category:** Hardware & Peripherals, Network
**Keywords:** Printer, Print Queue, Offline, Paper Jam, Toner, Scanner, Spooler, Network Printer, MFP

## 1. Overview
This document covers troubleshooting steps for local (USB) and network-attached printers, multifunction printers (MFPs), and common printing software issues.

## 2. Common Symptoms
* Printer status shows as "Offline".
* Print jobs are stuck in the queue.
* Printer is outputting blank pages or poor-quality prints.
* User cannot connect to a network printer.
* "Printer Driver is unavailable" error.

## 3. Resolution Steps

### A. Initial Hardware & Network Checks
1. **Power:** Ensure the printer is turned on and the display screen (if applicable) is active.
2. **Connectivity (Network):** Verify the Ethernet cable is plugged in or the printer is connected to Wi-Fi. Try to ping the printer's IP address from the user's machine.
3. **Connectivity (Local):** Verify the USB cable is securely connected to both the printer and the workstation. Try a different USB port.
4. **Physical Errors:** Check the printer's display panel for specific errors (e.g., Paper Jam, Replace Toner/Ink, Load Paper).

### B. Clearing the Print Spooler (Windows)
Often resolves jobs stuck in the queue.
1. Open Command Prompt as Administrator.
2. Type `net stop spooler` and press Enter.
3. Open File Explorer and navigate to: `C:\Windows\System32\spool\PRINTERS`
4. Delete all files in this folder (do NOT delete the folder itself).
5. Back in Command Prompt, type `net start spooler` and press Enter.
6. Ask the user to try printing again.

### C. Printer Shows as "Offline"
1. Go to **Settings > Devices > Printers & scanners**.
2. Select the printer and click **Open queue**.
3. Click **Printer** on the top menu bar.
4. Ensure **"Use Printer Offline"** is UNCHECKED.
5. If it's a network printer, ensure the user is connected to the corporate network or VPN.

### D. Reinstalling / Updating Drivers
1. Open **Device Manager**.
2. Expand **Print queues** and **Printers**.
3. Right-click the problematic printer and select **Uninstall device**.
4. Disconnect the printer or reboot the PC.
5. Reconnect, or navigate to **Settings > Devices > Printers & scanners** -> **Add a printer or scanner**.
6. Allow Windows to find and install the latest driver. For enterprise MFPs, use the approved print server path (e.g., `\\printserver01\PrinterName`).

### E. Mac Specific: Reset Printing System
1. Go to **Apple Menu > System Settings > Printers & Scanners**.
2. Right-click (or Control-click) anywhere in the empty space of the printer list.
3. Select **Reset printing system...**
4. *Warning: This removes ALL printers and scanners.* Re-add the necessary printer via IP or bonjour.

## 4. Escalation Path
* Hardware failure (fuser broken, persistent paper jam inside rollers) -> Escalate to **Facilities or Vendor Support (e.g., HP/Canon tech)**.
* Cannot reach print server / server offline -> Escalate to **Infrastructure/Network Team**.