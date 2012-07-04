YUI.add("editor-selection",function(b){var a="textContent",d="innerHTML",c="fontFamily";if(b.UA.ie){a="nodeValue";}b.EditorSelection=function(o){var j,p,f,g,e,l;if(b.config.win.getSelection&&(!b.UA.ie||b.UA.ie<9)){j=b.config.win.getSelection();}else{if(b.config.doc.selection){j=b.config.doc.selection.createRange();}}this._selection=j;if(!j){return false;}if(j.pasteHTML){this.isCollapsed=(j.compareEndPoints("StartToEnd",j))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=b.one(j.parentElement());if(o){f=b.config.doc.elementFromPoint(o.clientX,o.clientY);}e=j.duplicate();if(!f){p=j.parentElement();g=p.childNodes;for(l=0;l<g.length;l++){if(e.inRange(j)){if(!f){f=g[l];}}}}this.ieNode=f;if(f){if(f.nodeType!==3){if(f.firstChild){f=f.firstChild;}if(f&&f.tagName&&f.tagName.toLowerCase()==="body"){if(f.firstChild){f=f.firstChild;}}}this.anchorNode=this.focusNode=b.EditorSelection.resolve(f);e.moveToElementText(j.parentElement());var m=j.compareEndPoints("StartToStart",e),q=0;if(m){q=Math.abs(j.move("character",-9999));}this.anchorOffset=this.focusOffset=q;this.anchorTextNode=this.focusTextNode=b.one(f);}}else{if(j.htmlText&&j.htmlText!==""){var k=b.Node.create(j.htmlText);if(k&&k.get("id")){var h=k.get("id");this.anchorNode=this.focusNode=b.one("#"+h);}else{if(k){k=k.get("childNodes");this.anchorNode=this.focusNode=k.item(0);}}}}}else{this.isCollapsed=j.isCollapsed;this.anchorNode=b.EditorSelection.resolve(j.anchorNode);this.focusNode=b.EditorSelection.resolve(j.focusNode);this.anchorOffset=j.anchorOffset;this.focusOffset=j.focusOffset;this.anchorTextNode=b.one(j.anchorNode);this.focusTextNode=b.one(j.focusNode);}if(b.Lang.isString(j.text)){this.text=j.text;}else{if(j.toString){this.text=j.toString();}else{this.text="";}}};b.EditorSelection.removeFontFamily=function(f){f.removeAttribute("face");var e=f.getAttribute("style").toLowerCase();if(e===""||(e=="font-family: ")){f.removeAttribute("style");}if(e.match(b.EditorSelection.REG_FONTFAMILY)){e=e.replace(b.EditorSelection.REG_FONTFAMILY,"");f.setAttribute("style",e);}};b.EditorSelection.filter=function(e){var h=(new Date()).getTime();var g=b.all(b.EditorSelection.ALL),k=b.all("strong,em"),n=b.config.doc,p,f={},i="",l;var j=(new Date()).getTime();g.each(function(r){var q=b.Node.getDOMNode(r);if(q.style[c]){f["."+r._yuid]=q.style[c];r.addClass(r._yuid);b.EditorSelection.removeFontFamily(q);}});var o=(new Date()).getTime();b.all(".hr").addClass("yui-skip").addClass("yui-non");if(b.UA.ie){p=n.getElementsByTagName("hr");b.each(p,function(t){var r=n.createElement("div");r.className="hr yui-non yui-skip";r.setAttribute("readonly",true);r.setAttribute("contenteditable",false);if(t.parentNode){t.parentNode.replaceChild(r,t);}var q=r.style;q.border="1px solid #ccc";q.lineHeight="0";q.height="0";q.fontSize="0";q.marginTop="5px";q.marginBottom="5px";q.marginLeft="0px";q.marginRight="0px";q.padding="0";});}b.each(f,function(r,q){i+=q+" { font-family: "+r.replace(/"/gi,"")+"; }";});b.StyleSheet(i,"editor");k.each(function(u,q){var r=u.get("tagName").toLowerCase(),s="i";if(r==="strong"){s="b";}b.EditorSelection.prototype._swap(k.item(q),s);});l=b.all("ol,ul");l.each(function(r,q){var s=r.all("li");if(!s.size()){r.remove();}});if(e){b.EditorSelection.filterBlocks();}var m=(new Date()).getTime();};b.EditorSelection.filterBlocks=function(){var f=(new Date()).getTime();var n=b.config.doc.body.childNodes,h,g,q=false,k=true,e,r,t,p,m,o,u;if(n){for(h=0;h<n.length;h++){g=b.one(n[h]);if(!g.test(b.EditorSelection.BLOCKS)){k=true;if(n[h].nodeType==3){o=n[h][a].match(b.EditorSelection.REG_CHAR);u=n[h][a].match(b.EditorSelection.REG_NON);if(o===null&&u){k=false;}}if(k){if(!q){q=[];}q.push(n[h]);}}else{q=b.EditorSelection._wrapBlock(q);}}q=b.EditorSelection._wrapBlock(q);}r=b.all(b.EditorSelection.DEFAULT_BLOCK_TAG);if(r.size()===1){t=r.item(0).all("br");if(t.size()===1){if(!t.item(0).test(".yui-cursor")){t.item(0).remove();}var j=r.item(0).get("innerHTML");if(j===""||j===" "){r.set("innerHTML",b.EditorSelection.CURSOR);e=new b.EditorSelection();e.focusCursor(true,true);}if(t.item(0).test(".yui-cursor")&&b.UA.ie){t.item(0).remove();}}}else{r.each(function(s){var i=s.get("innerHTML");if(i===""){s.remove();}});}if(!b.UA.ie){}var l=(new Date()).getTime();};b.EditorSelection.REG_FONTFAMILY=/font-family: ;/;b.EditorSelection.REG_CHAR=/[a-zA-Z-0-9_!@#\$%\^&*\(\)-=_+\[\]\\{}|;':",.\/<>\?]/gi;b.EditorSelection.REG_NON=/[\s|\n|\t]/gi;b.EditorSelection.REG_NOHTML=/<\S[^><]*>/g;b.EditorSelection._wrapBlock=function(f){if(f){var e=b.Node.create("<"+b.EditorSelection.DEFAULT_BLOCK_TAG+"></"+b.EditorSelection.DEFAULT_BLOCK_TAG+">"),h=b.one(f[0]),g;for(g=1;g<f.length;g++){e.append(f[g]);}h.replace(e);e.prepend(h);}return false;};b.EditorSelection.unfilter=function(){var g=b.all("body [class]"),h="",f,i,e=b.one("body");g.each(function(j){if(j.hasClass(j._yuid)){j.setStyle(c,j.getStyle(c));j.removeClass(j._yuid);if(j.getAttribute("class")===""){j.removeAttribute("class");}}});f=b.all(".yui-non");f.each(function(j){if(!j.hasClass("yui-skip")&&j.get("innerHTML")===""){j.remove();}else{j.removeClass("yui-non").removeClass("yui-skip");}});i=b.all("body [id]");i.each(function(j){if(j.get("id").indexOf("yui_3_")===0){j.removeAttribute("id");j.removeAttribute("_yuid");}});if(e){h=e.get("innerHTML");}b.all(".hr").addClass("yui-skip").addClass("yui-non");return h;};b.EditorSelection.resolve=function(f){if(f&&f.nodeType===3){try{f=f.parentNode;}catch(e){f="body";}}return b.one(f);};b.EditorSelection.getText=function(f){var e=f.get("innerHTML").replace(b.EditorSelection.REG_NOHTML,"");e=e.replace("<span><br></span>","").replace("<br>","");return e;};b.EditorSelection.DEFAULT_BLOCK_TAG="p";b.EditorSelection.ALL="[style],font[face]";b.EditorSelection.BLOCKS="p,div,ul,ol,table,style";b.EditorSelection.TMP="yui-tmp";b.EditorSelection.DEFAULT_TAG="span";b.EditorSelection.CURID="yui-cursor";b.EditorSelection.CUR_WRAPID="yui-cursor-wrapper";b.EditorSelection.CURSOR='<span><br class="yui-cursor"></span>';
b.EditorSelection.hasCursor=function(){var e=b.all("#"+b.EditorSelection.CUR_WRAPID);return e.size();};b.EditorSelection.cleanCursor=function(){var f,e="br.yui-cursor";f=b.all(e);if(f.size()){f.each(function(g){var i=g.get("parentNode.parentNode.childNodes"),h;if(i.size()){g.remove();}else{h=b.EditorSelection.getText(i.item(0));if(h!==""){g.remove();}}});}};b.EditorSelection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(g,e){var f=b.Node.create("<"+e+"></"+e+">");f.set(d,g.get(d));g.set(d,"");g.append(f);return b.Node.getDOMNode(f);},_swap:function(g,e){var f=b.Node.create("<"+e+"></"+e+">");f.set(d,g.get(d));g.replace(f,g);return b.Node.getDOMNode(f);},getSelected:function(){b.EditorSelection.filter();b.config.doc.execCommand("fontname",null,b.EditorSelection.TMP);var f=b.all(b.EditorSelection.ALL),e=[];f.each(function(h,g){if(h.getStyle(c)==b.EditorSelection.TMP){h.setStyle(c,"");b.EditorSelection.removeFontFamily(h);if(!h.test("body")){e.push(b.Node.getDOMNode(f.item(g)));}}});return b.all(e);},insertContent:function(e){return this.insertAtCursor(e,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(l,g,i,o){var q=b.Node.create("<"+b.EditorSelection.DEFAULT_TAG+' class="yui-non"></'+b.EditorSelection.DEFAULT_TAG+">"),f,j,h,p,k=this.createRange(),n;if(g&&g.test("body")){n=b.Node.create("<span></span>");g.append(n);g=n;}if(k.pasteHTML){if(i===0&&g&&!g.previous()&&g.get("nodeType")===3){g.insert(l,"before");if(k.moveToElementText){k.moveToElementText(b.Node.getDOMNode(g.previous()));}k.collapse(false);k.select();return g.previous();}else{p=b.Node.create(l);try{k.pasteHTML('<span id="rte-insert"></span>');}catch(m){}f=b.one("#rte-insert");if(f){f.set("id","");f.replace(p);if(k.moveToElementText){k.moveToElementText(b.Node.getDOMNode(p));}k.collapse(false);k.select();return p;}else{b.on("available",function(){f.set("id","");f.replace(p);if(k.moveToElementText){k.moveToElementText(b.Node.getDOMNode(p));}k.collapse(false);k.select();},"#rte-insert");}}}else{if(i>0){f=g.get(a);j=b.one(b.config.doc.createTextNode(f.substr(0,i)));h=b.one(b.config.doc.createTextNode(f.substr(i)));g.replace(j,g);p=b.Node.create(l);if(p.get("nodeType")===11){n=b.Node.create("<span></span>");n.append(p);p=n;}j.insert(p,"after");if(h){p.insert(q,"after");q.insert(h,"after");this.selectNode(q,o);}}else{if(g.get("nodeType")===3){g=g.get("parentNode");}p=b.Node.create(l);l=g.get("innerHTML").replace(/\n/gi,"");if(l===""||l==="<br>"){g.append(p);}else{if(p.get("parentNode")){g.insert(p,"before");}else{b.one("body").prepend(p);}}if(g.get("firstChild").test("br")){g.get("firstChild").remove();}}}return p;},wrapContent:function(f){f=(f)?f:b.EditorSelection.DEFAULT_TAG;if(!this.isCollapsed){var h=this.getSelected(),k=[],g,i,j,e;h.each(function(o,l){var m=o.get("tagName").toLowerCase();if(m==="font"){k.push(this._swap(h.item(l),f));}else{k.push(this._wrap(h.item(l),f));}},this);g=this.createRange();j=k[0];i=k[k.length-1];if(this._selection.removeAllRanges){g.setStart(k[0],0);g.setEnd(i,i.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(g);}else{if(g.moveToElementText){g.moveToElementText(b.Node.getDOMNode(j));e=this.createRange();e.moveToElementText(b.Node.getDOMNode(i));g.setEndPoint("EndToEnd",e);}g.select();}k=b.all(k);return k;}else{return b.all([]);}},replace:function(k,i){var f=this.createRange(),j,e,g,h;if(f.getBookmark){g=f.getBookmark();e=this.anchorNode.get("innerHTML").replace(k,i);this.anchorNode.set("innerHTML",e);f.moveToBookmark(g);h=b.one(f.parentElement());}else{j=this.anchorTextNode;e=j.get(a);g=e.indexOf(k);e=e.replace(k,"");j.set(a,e);h=this.insertAtCursor(i,j,g,true);}return h;},remove:function(){if(this._selection&&this._selection.removeAllRanges){this._selection.removeAllRanges();}return this;},createRange:function(){if(b.config.doc.selection){return b.config.doc.selection.createRange();}else{return b.config.doc.createRange();}},selectNode:function(i,k,f){if(!i){return;}f=f||0;i=b.Node.getDOMNode(i);var g=this.createRange();if(g.selectNode){g.selectNode(i);this._selection.removeAllRanges();this._selection.addRange(g);if(k){try{this._selection.collapse(i,f);}catch(h){this._selection.collapse(i,0);}}}else{if(i.nodeType===3){i=i.parentNode;}try{g.moveToElementText(i);}catch(j){}if(k){g.collapse(((f)?false:true));}g.select();}return this;},setCursor:function(){this.removeCursor(false);return this.insertContent(b.EditorSelection.CURSOR);},getCursor:function(){return b.all("#"+b.EditorSelection.CURID);},removeCursor:function(e){var f=this.getCursor();if(f){if(e){f.removeAttribute("id");f.set("innerHTML",'<br class="yui-cursor">');}else{f.remove();}}return f;},focusCursor:function(g,e){if(g!==false){g=true;}if(e!==false){e=true;}var f=this.removeCursor(true);if(f){f.each(function(h){this.selectNode(h,g,e);},this);}},toString:function(){return"EditorSelection Object";}};b.Selection=b.EditorSelection;},"@VERSION@",{skinnable:false,requires:["node"]});