YUI.add("datasource-textschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceTextSchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(f){var d=(b.DataSource.IO&&(this.get("host") instanceof b.DataSource.IO)&&b.Lang.isString(f.data.responseText))?f.data.responseText:f.data,c=b.DataSchema.Text.apply.call(this,this.get("schema"),d);if(!c){c={meta:{},results:d};}this.get("host").fire("response",b.mix({response:c},f));return new b.Do.Halt("DataSourceTextSchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceTextSchema=a;},"@VERSION@",{requires:["datasource-local","plugin","dataschema-text"]});