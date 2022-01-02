# Engaged UTF-8 Browser Extension

* View and post all Unicode characters
* View old posts as they were
* Convert pasted text to ASCII
* Add images easily to posts
* Use with Chrome, Firefox, Brave, Edge and Opera, PC or Mac

This browser extension is specifically for Engaged users on [The WELL](https://www.well.com), it does nothing on any other website. It enables viewing and posting all Unicode, overriding the Engaged server settings that limit characters to the Windows-1252 extended ASCII character set. It also provides an automatic translation of your text posts into ASCII for compatibility with users who can't view Unicode. A feature for simple posting of images is also included.


## Installation
The extension is what's known as "unpacked" and requires separate files. That means installation must be done differently than from the web store. Start by *extracting* the zip file to a folder.

***Chrome/Brave*** - click the puzzle piece extensions icon on the right end of the address bar. Then at the bottom, click `Manage extensions`. Or use the three dots to choose `More Tools` and then `Extensions`. Or use this chrome://extensions/ Once you see the Extensions page, enable `Developer mode` with the slider at the upper right. That will show a `Load unpacked` button in the upper left. Click and browse to the extracted folder and click `Select Folder`.

***Firefox*** - click the `Application Menu` icon on the right end of the address bar. Then choose `Add-ons and themes`. Choose `Debug Add-ons` from the gear icon below the search box in about:addons.  Or use this link `about:debugging#/runtime/this-firefox` Click the `Load Temporary Add-on...` button and open the `manifest.json` file in the extracted zip folder.

***Edge*** - choose Extensions in the three dot menu or use edge://extensions/ Enable `Developer mode` on the lower left and then `Load unpacked` appears above. Click and browse to the extracted folder and click `Select Folder`.

***Opera*** - put opera:extensions in the address bar, then turn on `Developer mode` on the top right. Then `Load unpacked` appears above.Click and browse to the extracted folder and click `Select Folder`.

***Android*** - This requires using the Kiwi browser available in the Google Play Store. Then the same developer mode load unpacked installation method will work.

*iPhone* *Safari* *iOS* - Not at this time. Ask an Apple Developer to use this open source to create this for those platforms.

***Updating***
The link at the bottom of post pages like this <Engaged UTF-8 0.1.6> will download the latest version. If the folder name inside ends with the same version number as the link, you are current and do not need to update.


## Using the extension
What it does - The extension makes two changes to the character encoding used by Engaged. Pages are viewed with the UTF-8 Unicode characters rather than ISO-8859-1, and posts are accepted with UTF-8 characters instead of ASCII. The effect is the same as what Picospan users now see and post with current versions of terminal software that use the UTF-8 characters by default.

***Checkboxes*** are added to the bottom of pages that contain posts. When unchecked, Engaged users will see and post exactly as the Picospan users are doing. However, this displays the Unicode Unknown character � for posts that use the old encoding, mostly seen in quotes and apostrophes but also for many characters with diacritical marks like résumé and señor as well as € and © for example.

When the box `show I�m as I'm` is checked, the extension will replace the UTF-8 version of posts with bad Unicode with the old encoding that was used to create them. This will eliminate almost all character troubles, regardless of how the original post was created. Almost all users should leave this box checked since it only affects viewing of older posts. Click `show �` to see the UTF-8 version of the posts that have this.

The box with `post in ASCII` will translate any text in the response box into pure ASCII when checked. This prevents posting Unicode characters, they are replaced with (?), but it guarantees that no incompatible characters remain in your posts. When copy/pastecontent is used in posts, this will convert “I’m in a café sipping a €10 lattè into "I'm in a cafe sipping a EUR10 latte. Note the changed quote and missing diacritcals as well as EUR.

Most users will leave both boxes checked. However, you can create posts with *both ASCII and UTF-8*. By unchecking the post in ASCII box first, you can add any Unicode after the ASCII postion. This will not be readable for other Engaged users unless they are using this extension or another UTF-8 compatible viewing mode. For example this laughing face emoji 😂 looks like ðŸ˜‚ with the old character encoding.

***Line breaks*** - Engaged automatically adds new lines to posts whenever there are more words or characters than can fit on an 80 column screen. The extension does not change that, but both Unicode and ASCII translations can affect the line lengths. Use `Spellcheck` for a preview of your post to see where line breaks will occur. Note that Unicode characters may be up to four times wider, and they can be damaged by crossing a line break. Again, `Spellcheck` will show your post and how its lines may change. ASCII translation can add length to lines too.

## Posting Images
Clicking `Add Image` previews an example link of the Well logo followed by a `Size` box for a digit from 1 - 9 to size the image for your post. A single number keystroke will change the image size with an instant preview. Using 6 (or blank) will match the width ofthe post text. The actual image needs to be a link hosted somewhere on the web, this extension does not store a copy. I found that I can upload an image to [Imgur](https://imgur.com/) (not logged in) and use the actual image link (right click, copy image link) instead of the link they offer.

The `<img src=>` html will be added after any text already in the Postbox. You can add more text after it or move it. If you decide not to use the image you can remove it easily by deleting the link. And if you have tried another image but want the one you had previously, Z or ctrl-z will bring back the previous link
