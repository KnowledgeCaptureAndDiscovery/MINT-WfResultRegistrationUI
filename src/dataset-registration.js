/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/neon-animation/neon-animatable-behavior.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@polymer/paper-checkbox/paper-checkbox.js';




class DatasetRegistration extends PolymerElement {
    static get is() { return 'dataset-registration'; }
  static get properties(){
    return {
      obj:Object,
        datasets: Object,
        prov_id:String,
        returnDatasets:Object,
        metadata:Array,
        errorString:String,
        runIds:Array,
        executionResults:Array,
        registerDatasetArray:Array
    }
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        
        .flex-container {
            width: 100%;
            height: 250px;
            background-color: rgba(0, 0, 150, .3);
            text-align: center;
          }
         .flex-item {
            box-sizing: border-box;
            border: 1px solid #ddd;
            background-color: rgba(0, 150, 0, .3);
            display: inline-block;
            width: 150px;
            height: 250px;
          }
         .flex-item + .flex-item {
            margin-left: 2%;
          }
       paper-toast {
           --paper-toast-background-color:#4285f4;
      width: 300px;
      margin-left: calc(50vw - 150px);
      --paper-toast-color: #fff;
      font-size: 15px;
    }
    vaadin-text-area.max-height {
    max-height: 20000px; 
    width:100%;
  }
    
     .yellow-button {
    text-transform: none;
    color: #eeff41;
    }
    
    .red-button {
    text-transform: none;
    background-color: red;
    }
    
     .inline {
      display: inline;
      width: 20px;
    }
    
    .custom {
      width: 100%;
    }
    
    paper-checkbox .title {
      display: block;
      font-size: 1.2em;
    }

    paper-checkbox .subtitle {
      display: block;
      font-size: 0.9em;
      max-width: 150px;
    }
        
      </style>
   


      <div class="card">
    
     <h1>Select Run ID:</h1>
  <paper-dropdown-menu label="RunIds" class="custom">
      <paper-listbox slot="dropdown-content" class="dropdown-content custom"  on-iron-select="_itemSelected">
        <dom-repeat items="{{runIds}}">
            <template>
              <paper-item>[[item]]</paper-item>
            </template>
          </dom-repeat>
      </paper-listbox>
    </paper-dropdown-menu>
    
  
      </div>
      
      <!--<div class="card">-->
      <!--<h4> Your X-API-Key is </h4>{{obj.X-Api-Key}}-->
    <!--</div>-->
      
     <!--<div class="card">-->
     <!--<vaadin-button id="my-button" on-click="registerDataset" raised>Call Register Dataset API</vaadin-button>-->
<!--</div>-->


 <template is="dom-if" if="[[_checkBVal(executionResults)]]">
 <div class="card">
  <h1>Execution Results:</h1>
  <dom-repeat items="{{executionResults}}">
            <template>
            <p>
            <paper-checkbox checked="{{item.checked}}" value="[[item.label.value]]" on-change="checkBox">
             <span class="title">[[item.label.value]]</span>
    <span class="subtitle">[[item.result.value]]</span></paper-checkbox>
    </p>
            </template>
          </dom-repeat>
           <vaadin-button id="my-button1" on-click="registerDataset" raised>Register Checked Dataset</vaadin-button>
</div>
</template>


<!--<div class="card">-->
<!--<iron-form id="form1">-->
     <!--<form method="get" action="/foo">-->
      <!--<h1>Dataset Registration Form</h1>-->
       <!--<paper-dropdown-menu label="Provenance Ids">-->
      <!--<paper-listbox slot="dropdown-content" class="dropdown-content" selected="0" on-iron-select="_provSelected">-->
        <!--<paper-item value="28793fa8-9f2f-49b5-b052-7b65af9a44a0" >28793fa8-9f2f-49b5-b052-7b65af9a44a0</paper-item>-->
      <!--</paper-listbox>-->
    <!--</paper-dropdown-menu>-->
    <!--<paper-input label="Dataset Name" id="name" name="datasetName" ></paper-input>-->
   <!--&lt;!&ndash;<paper-input label="Dataset Description" id="desc" name="desc" ></paper-input>&ndash;&gt;-->
    <!--<vaadin-text-area label="Dataset Description" class="max-height" placeholder="Write Description of the Dataset" name="desc"></vaadin-text-area>-->
        <!--<br>-->
        <!--<vaadin-text-area label="Additional Metadata" class="max-height" placeholder="Add metadata in JSON format and in case of no data write {}" name="metadata"></vaadin-text-area>-->
        <!--<br>-->
        <!--<br>-->
    <!--&lt;!&ndash;<paper-input type="hidden" label="Provenance Id" id="prov_id" name="prov_id" value$="[[prov_id]]"></paper-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;<template is="dom-repeat" items="{{metadata}}">&ndash;&gt;-->
														<!--&lt;!&ndash;&ndash;&gt;-->
							<!--&lt;!&ndash;<div class="inline">&ndash;&gt;-->
								<!--&lt;!&ndash;<paper-input  label="key" slot="prefix" value="[[metadata.key]]"></paper-input>&ndash;&gt;-->
								<!--&lt;!&ndash;<paper-input  label="value" slot="suffix" value="{{metadata.value}}"></paper-input>&ndash;&gt;-->
						<!--&lt;!&ndash;</div>		&ndash;&gt;-->

				<!--&lt;!&ndash;</template>&ndash;&gt;-->
				<!--&lt;!&ndash;<paper-icon-button icon="icons:done" on-click="addData"></paper-icon-button>&ndash;&gt;-->
				<!--&lt;!&ndash;<paper-icon-button icon="icons:delete" on-click="removeData"></paper-icon-button>&ndash;&gt;-->
    <!--<vaadin-button id="my-button1" on-click="_submitForm" raised>Register Stored Dataset</vaadin-button>-->
      <!--</form>-->
   <!---->
<!--</div>-->


  <paper-toast id="toast" text="Dataset Submitted Successfully" class="fit-top" > </paper-toast>
  
  <paper-toast class="red-button" id="toast1" text="There was some error" class="fit-top" > </paper-toast>
 
      <iron-ajax id="session"
        url="https://api.mint-data-catalog.org/get_session_token"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
     
     <template is="dom-if" if="[[_checkBVal(returnDatasets)]]">
     
   
    <div class="card">
     <h1>Your Submitted Data</h1>
      <dom-repeat items="{{returnDatasets}}">
      <template>
     <p>Provenance Id: {{item.provenance_id}}</p>
   <p>Record_id: {{item.record_id}}</p>
    <p>Name: {{item.name}}</p>
    <p>Description: {{item.description}}</p>
    <p>Metadata: {{item.json_metadata}}</p>
    </template>
    </dom-repeat>
    </div>
    
    </template>
    
   <template is="dom-if" if="[[_checkBVal(errorString)]]">
    <div class="card">
    <p>Error: {{errorString}}</p>
   </div>
    </template>
    

      <!--<iron-ajax id="register" method="POST"-->
        <!--url="https://api.mint-data-catalog.org/datasets/register_datasets"-->
        <!--params='{datasets: {{datasets}}}'-->
        <!--handle-as="json"-->
        <!--on-response="handleResponse1"-->
        <!--debounce-duration="300">-->
    <!--</iron-ajax>-->
    `;
  }

    constructor() {
        super();
        this.getExecutionResults();
        this.metadata=[];
        this.executionResults=[];
        this.registerDatasetArray=[];
        this.push('metadata',{key:"",value:""});
    }

  _itemSelected(e){

        this.registerDatasetArray=[];
    var selectedItem=e.target.selectedItem;
    console.log(selectedItem.innerText);
    this.$.session.generateRequest();
    var _self=this;

      $.ajax({
          url: "http://ontosoft.isi.edu:8001/api/KnowledgeCaptureAndDiscovery/MINT-ProvenanceQueries/getExecutionResults",
          type: "GET",
          data:{
              exec: selectedItem.innerText
          },
          cache: false,
          timeout: 5000,
          async: false,
          success: function(data) {
             console.log(data);
             _self.process(data);

          },
          error: function(jqXHR, exception) {
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connected.\n Verify Network.';
              }
              else if (jqXHR.status == 404) {
                  msg = 'Requested page not found. [404]';
              }
              else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error [500].';
              }
              else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              }
              else if (exception === 'timeout') {
                  msg = 'Time out error.';
              }
              else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              }
              else {
                  msg = 'Uncaught Error.\n' + jqXHR.responseText;
              }
          }
      });

    }

    process(data){
        var obj = JSON.parse(JSON.stringify(data));
        console.log(obj);
        var temp=[];
        for(var i = 0; i < obj.results.bindings.length; ++i) {
            var label=obj.results.bindings[i].label;
            var result=obj.results.bindings[i].result;
            temp.push({"label":label,"result":result,"checked":false});
            // this.push('executionResults',{label:label,result:result,checked:false});
        }
        //this.push(this.executionResults,obj.results.bindings);
       // this.executionResults=obj.results.bindings;
        // this.notifyPath(this.executionResults);
        this.set('executionResults', temp);
        console.log(this.executionResults);
    }

    _provSelected(e){
        this.prov_id=e.target.selectedItem.innerText;
    }

    handleResponse(data){
    console.log(data.detail.response);
   this.obj=data.detail.response;
    console.log(this.obj['X-Api-Key']);
    }

    handle(data){
        console.log(data.detail.response);
        this.obj=data.detail.response;
        console.log(this.obj);
    }

    registerDataset(){
        var data=[];

        var temp=this.registerDatasetArray.length;
        console.log(temp);
        for(var i = 0; i < temp; ++i) {
            var dataset= {
                "record_id":"a7792c09-e3bc-445b-a3f1-5f01bfddb827",
                "description":this.registerDatasetArray[i],
                "name": this.registerDatasetArray[i],
                "provenance_id": "28793fa8-9f2f-49b5-b052-7b65af9a44a0",
                "metadata":"{}"
            };
            data.push(dataset);
        }
        console.log(data);
        var _self = this;
    //this.$.session.generateRequest();
    this.datasets= data;

        console.log(this.obj);
        var val=this.obj['X-Api-Key'];
        $.ajax({
            crossOrigin:true,
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: "https://api.mint-data-catalog.org/datasets/register_datasets",
            type: "POST",
            data: JSON.stringify({ datasets: data }),
            headers: {
                'X-Api-Key': val
            },
            cache: false,
            timeout: 5000,
            async: false,
            success: function(data) {
                console.log("Datasets", data);
                _self.showToast(data);
            },

            error: function(jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connected.\n Verify Network.';
                }
                else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                }
                else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                }
                else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                }
                else if (exception === 'timeout') {
                    msg = 'Time out error.';
                }
                else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                }
                else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
             _self.showError(msg);
            }
        });
    }

    _submitForm(event) {
        console.log("Form submitted");
        console.log(this.$.form1.serializeForm());
      //  this.querySelector('.output').innerHTML = JSON.stringify(this.$.form1.favoritePizza);
        this.datasets=this.$.form1.serializeForm();
        this.registerDataset();
    }

    _checkBVal(stuff){
        console.log("Found", stuff)
        if(stuff.length === 0){
            return false
        }
        return true
    }

    _checkNegBVal(stuff){
        console.log("Found", stuff)
        if(stuff.length === 0){
            return true
        }
        return false
    }

    _toggle(){
        this.$.toast.toggle();
    }

    showToast(data){
        this.errorString="";
        this.returnDatasets=data.datasets;
        this.$.toast.show();
    }

    showError(msg){
        this.returnDatasets=[];
        this.errorString=msg;
        this.$.toast1.show();
    }

    addData(){

        this.push('metadata',{key:"",value:""});
    }

    processExecutionReuslt(data){
        var obj = JSON.parse(JSON.stringify(data));
        var vars = [];
        //this.unModifiedConfigurationResults=JSON.parse(JSON.stringify(data));
        for(var i = 0; i < obj.results.bindings.length; ++i) {
            for(var key in obj.results.bindings[i]) {

                if(obj.results.bindings[i][key].type.includes("uri")) {
                    var strs = obj.results.bindings[i][key].value;
                    vars.push(strs);

                }
            }
        }
        console.log("this is config");
        console.log(vars[0]);
        this.runIds=vars;
    }

    getExecutionResults(){
        var _self=this;
        $.ajax({
            crossOrigin:true,
            url: "http://ontosoft.isi.edu:8001/api/KnowledgeCaptureAndDiscovery/MINT-ProvenanceQueries/getAllExecutions?endpoint=http%3A%2F%2Fdisk.isi.edu%3A3030%2Fds%2Fquery",
            type: "GET",
            cache: false,
            timeout: 5000,
            async: false,
            success: function(data) {
                console.log("Run-IDs", data)
               _self.processExecutionReuslt(data);
            },

            error: function(jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connected.\n Verify Network.';
                }
                else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                }
                else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                }
                else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                }
                else if (exception === 'timeout') {
                    msg = 'Time out error.';
                }
                else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                }
                else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                 console.log(msg);
            }
        });
    }

    checkBox(event){

        if(event.target.checked) {
            this.push('registerDatasetArray',event.target.value);
        }
        else{
            if(this.registerDatasetArray.includes(event.target.value)){
                var index = this.registerDatasetArray.indexOf(event.target.value);
                if (index > -1) {
                    this.registerDatasetArray.splice(index, 1);
                }
            }
        }
        console.log(this.registerDatasetArray);

    }


}




window.customElements.define('dataset-registration', DatasetRegistration);
