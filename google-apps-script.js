/**
 * Google Apps Script for Dhamtari Esports Tournament
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click "Extensions" > "Apps Script"
 * 3. Delete any code in the editor, and paste this entire code
 * 4. Click "Save" (disk icon)
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon (Select type) > Choose "Web app"
 * 7. Set:
 *    - Description: "Esports Tournament API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <--- (IMPORTANT!)
 * 8. Click "Deploy" > Authorize access with your Google account
 * 9. Copy the "Web App URL" (ends with /exec)
 * 10. Paste the URL into the Organizer Dashboard on the website or in .env (VITE_GOOGLE_SHEETS_URL)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers automatically if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Pass ID",
        "Timestamp",
        "Game",
        "Squad Name",
        "Captain Name",
        "Captain UID",
        "WhatsApp Phone",
        "College Name",
        "Player 2",
        "Player 3",
        "Player 4",
        "Substitute"
      ]);
      
      // Format header row with styling
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#f3f4f6");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    var row = [
      data.id || "",
      data.timestamp || new Date().toLocaleString("en-IN"),
      data.game || "",
      data.teamName || "",
      data.captainName || "",
      "'" + (data.captainUid || ""), // single quote to preserve numeric formatting
      "'" + (data.phone || ""),
      data.collegeName || "",
      data.player2 || "",
      data.player3 || "",
      data.player4 || "",
      data.substitute || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Entry recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Webhook is active and running!");
}
