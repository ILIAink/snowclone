# IT Knowledge Base: Peripherals Troubleshooting

**Document ID:** KB-006
**Category:** Hardware & Peripherals
**Keywords:** Keyboard, Mouse, Headset, Monitor, Webcam, USB, Bluetooth, Display, Audio, No Sound

## 1. Overview
This guide addresses troubleshooting steps for common external hardware peripherals including input devices, audio devices, displays, and webcams.

## 2. General Troubleshooting for All Peripherals
Before diving into specific devices, always perform these basic checks:
1. **Physical connection:** Unplug and plug the device back in. Try a different USB port (preferably directly on the computer, bypassing docks/hubs).
2. **Restart:** Reboot the computer.
3. **Test elsewhere:** If possible, plug the peripheral into another computer to see if the hardware itself is defective.

---

## 3. Keyboard & Mouse

### A. Wireless / Bluetooth Issues
1. **Batteries:** Swap the batteries or ensure the device is fully charged.
2. **Dongle:** If using a 2.4GHz USB dongle (e.g., Logitech Unifying), ensure it's plugged in securely. Move it to a port closer to the device to reduce interference.
3. **Bluetooth Pairing:**
   * Go to **Settings > Bluetooth & devices**.
   * Remove the device if it's listed but not working.
   * Put the keyboard/mouse into pairing mode and re-pair.

### B. Unresponsive or Sticky Keys
* If a wired keyboard is entirely unresponsive, check Device Manager for USB errors.
* If specific keys are sticky, recommend canned air cleaning. If liquid damage occurred, the keyboard must be replaced.

---

## 4. Monitors & Displays

### A. No Signal / Black Screen
1. Ensure the monitor is powered on (look for an LED light on the bezel).
2. Check the input source on the monitor's physical buttons (ensure it's set to HDMI, DisplayPort, or USB-C matching the cable).
3. Reseat the video cables on both the monitor and the PC/Docking Station.
4. Press `Windows Key + P` and ensure it's set to **Extend** or **Duplicate**, not "PC screen only".

### B. Resolution & Scaling Issues
1. Right-click the desktop and select **Display settings**.
2. Select the problematic monitor.
3. Ensure **Display resolution** is set to the *(Recommended)* value.
4. Adjust **Scale** (e.g., 100% or 125%) if text is too small or blurry.

---

## 5. Headsets & Audio

### A. No Sound (Playback) or Mic Not Working (Recording)
1. Check physical mute buttons or volume wheels on the headset cord.
2. **Windows Sound Settings:** Right-click the speaker icon in the system tray -> **Sound settings**.
   * Ensure the headset is selected as the **Output** and **Input** device.
   * Check the volume slider.
3. **App-Specific Settings:** In Teams or Zoom, go to Audio Settings and verify the correct device is selected. (Often, Windows default is correct, but Teams is looking at the laptop mic).
4. **Privacy Settings (Mic):** Go to **Settings > Privacy & security > Microphone**. Ensure "Let apps access your microphone" is turned ON.

---

## 6. Webcams

### A. Black Screen / Not Detected
1. Check for a physical privacy shutter on the webcam or laptop bezel. Slide it open.
2. Some laptops have a physical function key (e.g., F8 or Fn+F8) that disables the camera at the hardware level.
3. **Privacy Settings:** Go to **Settings > Privacy & security > Camera**. Ensure camera access is ON for the specific app (Zoom/Teams).
4. **Device Manager:** Look under "Cameras" or "Imaging devices". If it has a yellow exclamation mark, right-click -> Update driver.

## 7. Escalation & Replacement Path
* If a peripheral is confirmed physically broken or defective after testing on multiple machines -> Initiate a hardware replacement request via the **IT Procurement process**.
* Docking station firmware issues preventing monitor output -> Escalate to **Tier 2 Desktop Support** for firmware flashing.