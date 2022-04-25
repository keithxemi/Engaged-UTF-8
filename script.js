const version = 'Engaged UTF-8  0.1.9'
"use strict";

var postForm = document.getElementsByClassName("PostForm")[0]
if (postForm) postForm.setAttribute('accept-charset','utf-8')

var newStyles = document.createTextNode('.unknown{display:none;}.showBad{cursor:pointer;color:gray;width:100%;font-size:13px;margin:0;}.showBad:focus~.unknown{display:block;font:inherit;}')
var addCSS = document.createElement('style')
addCSS.appendChild(newStyles)
var docHead = document.getElementsByTagName('head')[0]
docHead.insertBefore(addCSS, docHead.childNodes[2])

var PostBox = document.getElementById("PostBoxWrapper")

var unbakeMoji = true
if (PostBox) {
  var chkDiv = document.createElement('div')
  PostBox.appendChild(chkDiv)
  chkDiv.style = 'opacity:60%; padding-left:8px;'
  var chk1 = document.createElement('input')
  chk1.setAttribute('type','checkbox')
  chk1.setAttribute('id','asc')
  chk1.setAttribute('name','asc')
  chkDiv.append(chk1)
  chk1.addEventListener('change', ascChange)  
  var chk1Lbl = document.createElement('label')
  chk1Lbl.setAttribute('for','asc')
  chk1Lbl.innerText = ' post in ASCII' 
  chk1Lbl.style = 'margin-right:20px;color: #00528a;font-weight:bold;cursor:pointer;'
  chkDiv.append(chk1Lbl)
  
  var chk2 = document.createElement('input')
  chk2.setAttribute('type','checkbox')
  chk2.setAttribute('id','moji')
  chk2.setAttribute('name','moji')
  chkDiv.append(chk2)
  chk2.addEventListener('change', mojiChange)  
  var chk2Lbl = document.createElement('label')
  chk2Lbl.setAttribute('for','moji')
  chk2Lbl.innerText = " show I�m as I'm" 
  chk2Lbl.style = 'margin-right:20px;color: #00528a;font-weight:bold;cursor:pointer;'
  chkDiv.append(chk2Lbl)
  
  var addImage = document.createElement('input')
  addImage.setAttribute('value','Add Image')
  addImage.setAttribute('class','TextButton')
  addImage.setAttribute('type','button')
  addImage.style = 'padding-top:0px;margin-right:20px' 
  chkDiv.appendChild(addImage)
  addImage.addEventListener('click',mainImg)
  
  var verTxt = document.createElement('a')
  verTxt.setAttribute('href','https://people.well.com/user/keitht/extension.html')
  verTxt.setAttribute('target','_blank')
  verTxt.textContent += version
  verTxt.setAttribute('style','font-size:13px;display:inline;margin-left:20px;')
  chkDiv.append(verTxt)
  
  var translateToAscii
  if(!localStorage.getItem('asc')) {
    localStorage.setItem('asc','yes')
    translateToAscii = true
    chk1.checked = true
  } else {
    translateToAscii = (localStorage.getItem('asc') === 'yes') ? true : false
    chk1.checked = (translateToAscii) ? true : false
  }
  
  if(!localStorage.getItem('moji')) {
    localStorage.setItem('moji','yes')
    unbakeMoji = true
    chk2.checked = true
  } else {
    unbakeMoji = (localStorage.getItem('moji') === 'yes') ? true : false
    chk2.checked = (unbakeMoji) ? true : false
  }  
}

function ascChange() {
    if (chk1.checked) {
        translateToAscii = true
        localStorage.setItem('asc','yes')
    } else {
        translateToAscii = false
        localStorage.setItem('asc','no')
    }
}

function mojiChange() {
    if (chk2.checked) {
        unbakeMoji = true
        localStorage.setItem('moji','yes')
    } else {
        unbakeMoji = false
        localStorage.setItem('moji','no')
    }
    location.reload()
}

var postResponse = document.getElementById("Response")
if (postResponse && translateToAscii) {
    postResponse.addEventListener('paste', () => {setTimeout(() => {
      if (!translateToAscii) return
      postResponse.value = ascii(postResponse.value)
      var unknowns = ((postResponse.value || '').match(/(\[\-\])/g) || []).length
      if (unknowns > 0) msg.innerHTML = unknowns + ' unknown [-]'
      else msg.innerHTML = ''
    })})  
    var msg = document.getElementById("PostBoxWrapper").appendChild(document.createElement('div'))
    msg.setAttribute('style','color:red;padding:8px;')
}

var ascUrl = new URL('https://user.well.com/engaged.cgi')
var conference, topic, responses 
var keepNew = document.getElementById('KeepNew')
var hasPosts = keepNew ? true : false
if (hasPosts) {
    var kurl = new URL(document.getElementById('KeepNew').href)
    var knSearch = new URLSearchParams(kurl.search)
    conference = knSearch.get('c')
    topic = knSearch.get('t')
    var lastRead = knSearch.get('l')
    var global = knSearch.get('g')
    var docSearch = new URLSearchParams(location.search)  
    responses = docSearch.get('q')  
    var frame = docSearch.get('f')
    var action = docSearch.get('a')
    var hasNew = document.getElementsByClassName('ShortCenter')[0] ? true : false
    if (hasNew) {
        ascUrl.search = 'a=u&c=' + conference + '&t=' + topic
        if (frame) ascUrl.search += '&f=0'
        if (lastRead) ascUrl.search += '&l=' + lastRead
        if (responses) ascUrl.search += '&q=' + responses
        if (global) ascUrl.search += '&g=' + global            
    } else {
        ascUrl.search = 'c=' + conference + '&t=' + topic
        if (frame) ascUrl.search += '&f=0'     
        if (responses) ascUrl.search += '&q=' + responses 
        if (action === 'r') ascUrl.search += '&q=' + document.getElementById('JumpData').value 
    }
}

if (hasPosts && unbakeMoji) {
    var xhr = new XMLHttpRequest()
    xhr.overrideMimeType(`text/html; charset=ISO-8859-1`)
    xhr.open("GET", ascUrl, true)
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                notNew()
                parseAsc(xhr.responseText)
            }
        }
    }
    xhr.send(null)
}

function notNew() {
    var xnn = new XMLHttpRequest()
    ascUrl.search = 't=' + topic + '&c=' + conference + '&f=0'
    if (responses) ascUrl.search += '&q=' + responses
    xnn.open("GET", ascUrl, true)
    xnn.send(null)
}

function parseAsc(resp) {
    if (!conference) return
    var parser = new DOMParser()
    var ascDoc = parser.parseFromString(resp, 'text/html')
    var posts = document.querySelectorAll('div[class^="author-"]')
    var ascPosts = ascDoc.querySelectorAll('div[class^="author-"]')
    if (posts.length !== ascPosts.length) {return}
    for (var i = 0;i < posts.length;i++){
        if(posts[i] == undefined) {return}
        if(ascPosts[i] == undefined) {return}
        if (posts[i].getElementsByClassName('rpnum')[0].innerText !== ascPosts[i].getElementsByClassName('rpnum')[0].innerText) {return}
        if (posts[i].innerHTML.indexOf('�') > -1){
            var badPost = posts[i].innerHTML
            posts[i].innerHTML = ascPosts[i].innerHTML
            var badUTF = document.createElement('div')
            badUTF.setAttribute('class','Post')
            if (posts[i].querySelector('.Hidden')) {
              badUTF.innerHTML = '<pre class="showBad" tabindex="0">show �</pre><div>' + badPost
            }
            else badUTF.innerHTML = '<pre class="showBad" tabindex="0">show �</pre><div class="unknown">' + badPost
            badUTF.querySelector(".ResponseSeparator").style = 'opacity:50%;'
            posts[i].append(badUTF)
        }
        var postText = posts[i].querySelector(".Post")
        if (postText) postText.innerHTML = postText.innerHTML.replace(/&amp;#(\d+);/g,decodeHtml)      
        posts[i].innerHTML = posts[i].innerHTML.replace(/\u2028/g,'\n')
        posts[i].innerHTML = posts[i].innerHTML.replace(/\u2029/g,'\n\n')
    }
}

function decodeHtml(match) {
    var txt = document.createElement("textarea")
    txt.innerHTML = match
    txt.value = txt.value.replace('&#8232;','\n')
    txt.value = txt.value.replace('&#8233;','\n\n')
    return txt.value
}

var originalPost
var imgDiv
var imgLink
var undoLink
var previewImg
var hiddenImg
var imgSrc = 'https://user.well.com/Images/engaged/logo-white.png'
var imgWidth = "auto"
var adjust
var added = false

function mainImg() {
    if (added) return
    added = true
    originalPost = postResponse.value
    imgDiv = document.createElement('div')
    PostBox.appendChild(imgDiv)
    addLink()
    addAdjust()
    addImg()
    gotoBottom()
    newWidth()
}

function badLink() {
    postResponse.value = originalPost
    imgLink.value = '*** Could not load image link ***'      
    if(imgSrc === '?') imgLink.value = '*** Insecure image links are blocked (must be HTTPS://) ***'
}

function newImg() {
    undoLink = imgLink.value
    imgLink.value = imgSrc
    badMsg = ''
    if(imgSrc.indexOf('http://') > -1) imgSrc = '?'
    hiddenImg.setAttribute('src', imgSrc)
    previewImg.setAttribute('src', imgSrc)
    if (hiddenImg.complete) {
        newWidth()
    } else {
        hiddenImg.addEventListener('load', newWidth)
        hiddenImg.addEventListener('error', badLink)
    }
}

function keycheck() {
    if (event.key === 'Escape' ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Space' ||
        event.key === 'Home' ||
        event.key === 'End' ||
        event.key === 'Insert')
    {
        event.preventDefault()
        imgSrc = ''
        newImg()
    }
    else if (event.key === 'z' || event.key === 'Z')
    {
        event.preventDefault()
        imgLink.value = undoLink
        imgSrc = undoLink
        newImg()
    }
}

function newWidth() {
    var formEntry = parseInt(adjust.value)
    if (isNaN(formEntry)) formEntry = 0
    var sizes = [100,140,191,276,387,543,762,1069,1500]
    if (formEntry >= 1 && formEntry <= 9) imgWidth = sizes[formEntry - 1]
    else {
        imgWidth = 543
        adjust.value = ' '
    }
    adjust.select()
    previewImg.setAttribute("width",imgWidth)
    var postSize = imgWidth
    if (postSize === ' ') postSize = hiddenImg.width
    postResponse.value = originalPost + '\\<img src="'+ imgSrc + '" width=' + imgWidth + '>' + '\n\n<' + imgSrc + '>'
}

function addLink(){
    imgLink = document.createElement('textarea')
    imgLink.setAttribute('rows','1')
    imgLink.setAttribute('cols','70')
    imgLink.setAttribute('style','resize:none;overflow:hidden;vertical-align:middle;margin-right:6px')
    imgLink.value = imgSrc
    imgDiv.appendChild(imgLink)
    imgLink.addEventListener('click', function() {imgLink.select()})
    imgLink.addEventListener('paste', () => {setTimeout(() => {
      imgSrc = imgLink.value
      newImg()
    })})
    imgLink.addEventListener('keydown',keycheck)
}

function addAdjust() {
    imgDiv.appendChild(document.createTextNode('Size'))
    adjust = document.createElement('textarea')
    adjust.setAttribute('rows','1')
    adjust.setAttribute('cols','1')
    adjust.setAttribute('style','width:15px;resize:none;overflow:hidden;vertical-align:middle;margin:6px')
    imgDiv.appendChild(adjust)
    imgDiv.appendChild(document.createTextNode('1 - 9'))
    adjust.addEventListener('click', function() {adjust.select()})
    adjust.addEventListener('change', newWidth)
    adjust.addEventListener('input', newWidth,true)
}

function addImg() {
    var imgBox = document.createElement('div')
    imgDiv.appendChild(imgBox)
    previewImg = document.createElement('img')
    imgBox.appendChild(previewImg)
    previewImg.src = imgSrc
    hiddenImg = document.createElement('img')
    hiddenImg.setAttribute('style','display:none')
    hiddenImg.src = imgSrc
    imgBox.appendChild(hiddenImg)
}

function gotoBottom(){
    var element = document.getElementById('Wrapper')
    element.scrollTop = element.scrollHeight - element.clientHeight
}

function ascii(p) {
    p = p.replace(/&nbsp;/g, ' ')
    p = p.replace(/“/g, '"')
    p = p.replace(/”/g, '"')
    p = p.replace(/‘/g, "'")
    p = p.replace(/’/g, "'")
    p = p.replace(/¡/g, '!')
    p = p.replace(/¿/g, '?')
    p = p.replace(/—/g, '---')
    p = p.replace(/´/g, "'")
    p = p.replace(/·/g, '*')
    p = p.replace(/¸/g, ',')
    p = p.replace(/«/g, '<<')
    p = p.replace(/»/g, '>>')
    p = p.replace(/ˆ/g, '^')
    p = p.replace(/˜/g, '~')
    p = p.replace(/–/g, '--')
    p = p.replace(/‚/g, ',')
    p = p.replace(/„/g, ',,')
    p = p.replace(/‹/g, '<')
    p = p.replace(/›/g, '>')
    p = p.replace(/€/g, 'EUR')
    p = p.replace(/£/g, 'GBP')
    p = p.replace(/¥/g, 'YEN')
    p = p.replace(/¢/g, 'cents')
    p = p.replace(/©/g, '(c)')
    p = p.replace(/®/g, '(r)')
    p = p.replace(/§/g, 'section')
    p = p.replace(/™/g, 'TM')
    p = p.replace(/†/g, '+')
    p = p.replace(/‡/g, '++')
    p = p.replace(/•/g, '*')
    p = p.replace(/…/g, '...')
    p = p.replace(/‰/g, '0/00')
    p = p.replace(/µ/g, 'u')
    p = p.replace(/¶/g, 'pilcrow')
    p = p.replace(/¤/g, 'currency')
    p = p.replace(/¦/g, '|')
    p = p.replace(/¬/g, 'not')
    p = p.replace(/­/g, '-')
    p = p.replace(/¯/g, 'macron')
    p = p.replace(/°/g, 'deg')
    p = p.replace(/º/g, 'ordinal')
    p = p.replace(/¹/g, '^1')
    p = p.replace(/²/g, '^2')
    p = p.replace(/³/g, '^3')
    p = p.replace(/¨/g, 'diaresis')
    p = p.replace(/ª/g, 'ordinal')
    p = p.replace(/×/g, 'multiplication')
    p = p.replace(/÷/g, 'division')
    p = p.replace(/±/g, '+/-')
    p = p.replace(/¼/g, '1/4')
    p = p.replace(/½/g, '1/2')
    p = p.replace(/¾/g, '3/4')
    p = p.replace(/Ø/g, '0')
    p = p.replace(/ø/g, '0')
    p = p.replace(/Á/g, 'A')
    p = p.replace(/É/g, 'E')
    p = p.replace(/Í/g, 'I')
    p = p.replace(/Ó/g, 'O')
    p = p.replace(/Ú/g, 'U')
    p = p.replace(/Ý/g, 'Y')
    p = p.replace(/á/g, 'a')
    p = p.replace(/é/g, 'e')
    p = p.replace(/í/g, 'i')
    p = p.replace(/ó/g, 'o')
    p = p.replace(/ú/g, 'u')
    p = p.replace(/ý/g, 'y')
    p = p.replace(/Ä/g, 'A')
    p = p.replace(/Ë/g, 'E')
    p = p.replace(/Ï/g, 'I')
    p = p.replace(/Ö/g, 'O')
    p = p.replace(/Ü/g, 'U')
    p = p.replace(/Ÿ/g, 'Y')
    p = p.replace(/ä/g, 'a')
    p = p.replace(/ë/g, 'e')
    p = p.replace(/ï/g, 'i')
    p = p.replace(/ö/g, 'o')
    p = p.replace(/ü/g, 'u')
    p = p.replace(/ÿ/g, 'y')
    p = p.replace(/À/g, 'A')
    p = p.replace(/È/g, 'E')
    p = p.replace(/Ì/g, 'I')
    p = p.replace(/Ò/g, 'O')
    p = p.replace(/Ù/g, 'U')
    p = p.replace(/à/g, 'a')
    p = p.replace(/è/g, 'e')
    p = p.replace(/ì/g, 'i')
    p = p.replace(/ò/g, 'o')
    p = p.replace(/ù/g, 'u')
    p = p.replace(/Â/g, 'A')
    p = p.replace(/Ê/g, 'E')
    p = p.replace(/Î/g, 'I')
    p = p.replace(/Ô/g, 'I')
    p = p.replace(/Û/g, 'U')
    p = p.replace(/â/g, 'a')
    p = p.replace(/ê/g, 'e')
    p = p.replace(/î/g, 'i')
    p = p.replace(/ô/g, 'o')
    p = p.replace(/û/g, 'u')
    p = p.replace(/Ã/g, 'A')
    p = p.replace(/Ñ/g, 'N')
    p = p.replace(/Õ/g, 'O')
    p = p.replace(/ã/g, 'a')
    p = p.replace(/ñ/g, 'n')
    p = p.replace(/õ/g, 'o')
    p = p.replace(/Å/g, 'A')
    p = p.replace(/å/g, 'a')
    p = p.replace(/Æ/g, 'AE')
    p = p.replace(/æ/g, 'ae')
    p = p.replace(/ß/g, 'SS')
    p = p.replace(/þ/g, 'th')
    p = p.replace(/Þ/g, 'TH')
    p = p.replace(/Ç/g, 'C')
    p = p.replace(/ç/g, 'c')
    p = p.replace(/Ð/g, 'ETH')
    p = p.replace(/Œ/g, 'OE')
    p = p.replace(/œ/g, 'oe')
    p = p.replace(/ƒ/g, 'f')
    p = p.replace(/ð/g, 'eth')
    p = p.replace(/Š/g, 'S')
    p = p.replace(/š/g, 's')
    p = p.replace(/Ž/g, 'Z')
    p = p.replace(/ž/g, 'z')
    p = p.replace(/[\u2000-\u200a\u202f\u205f\u3000]/g,' ')//spaces
    p = p.replace(/[\u200b\u200d\u2060-\u2064\ufeff]/g,'')//zero width spaces
    p = p.replace(/[\u2011]/g,'-')
    p = p.replace(/[\u2028]/g,'\n')//line separator
    p = p.replace(/[\u2029]/g,'\n\n')//paragraph separator
    p = p.replace(/[^\x00-\x7F]/g,'[-]')//unknown non-ascii
    return(p)
}