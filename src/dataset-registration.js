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




class DatasetRegistration extends PolymerElement {
    static get is() { return 'dataset-registration'; }
  static get properties(){
    return {
      obj:Object,
        datasets: Object,
        prov_id:String,
        returnDatasets:Object
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
    }
    
     .yellow-button {
    text-transform: none;
    color: #eeff41;
  }
        
      </style>
   


      <div class="card">
     <h1>Select Run ID:</h1>
  <paper-dropdown-menu label="RunIds">
      <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0" on-iron-select="_itemSelected">
        <paper-item >1</paper-item>
        <paper-item >2</paper-item>
        <paper-item >3</paper-item>
        <paper-item >4</paper-itemlabel>
      </paper-listbox>
    </paper-dropdown-menu>
    
   
      </div>
      
      <!--<div class="card">-->
      <!--<h4> Your X-API-Key is </h4>{{obj.X-Api-Key}}-->
    <!--</div>-->
      
     <!--<div class="card">-->
     <!--<vaadin-button id="my-button" on-click="registerDataset" raised>Call Register Dataset API</vaadin-button>-->
<!--</div>-->

<div class="card">
<iron-form id="form1">
     <form method="get" action="/foo">
      <h1>Dataset Registration Form</h1>
       <paper-dropdown-menu label="Provenance Ids">
      <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0" on-iron-select="_provSelected">
        <paper-item value="28793fa8-9f2f-49b5-b052-7b65af9a44a0" >28793fa8-9f2f-49b5-b052-7b65af9a44a0</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>
   <paper-input label="Dataset Description" id="desc" name="desc"></paper-input>
       <paper-input label="Dataset Name" id="name" name="datasetName"></paper-input>
    <!--<paper-input type="hidden" label="Provenance Id" id="prov_id" name="prov_id" value$="[[prov_id]]"></paper-input>-->
    
    </br>
    <vaadin-button id="my-button1" on-click="_submitForm" raised>Register Stored Dataset</vaadin-button>
      </form>
   
</div>


  <paper-toast id="toast" text="Dataset Submitted Successfully" class="fit-top" > </paper-toast>
 
      <iron-ajax id="session"
        url="https://api.mint-data-catalog.org/get_session_token"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
     <template is="dom-if" if="[[_checkBVal(returnDatasets)]]">
    <div class="card">
    <h4>Your Submitted Data</h4>
    <p>Record_id: {{returnDatasets.record_id}}</p>
    <p>Description: {{returnDatasets.description}}</p>
    <p>Name: {{returnDatasets.name}}</p>
    <p>Provenance Id: {{returnDatasets.provenance_id}}</p>
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
    }

  _itemSelected(e){
    var selectedItem=e.target.selectedItem;
    console.log(selectedItem.innerText);
    this.$.session.generateRequest();

    }

    _provSelected(e){
        this.prov_id=e.target.selectedItem.innerText;
    }

    handleResponse(data){
    console.log(data.detail.response);
   this.obj=data.detail.response;
    console.log(this.obj['X-Api-Key']);
    }

    registerDataset(){
        var _self = this;
    //this.$.session.generateRequest();
    this.datasets= [{
        "record_id":"a7792c09-e3bc-445b-a3f1-5f01bfddb827",
        "description":this.datasets.desc,
        "name": this.datasets.datasetName,
        "provenance_id": this.prov_id,
        "metadata": {
        "contact_information": {"name": "dcat_user"}
        }
    }];

        console.log(this.obj);
        var val=this.obj['X-Api-Key'];
        $.ajax({
            crossOrigin:true,
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            url: "https://api.mint-data-catalog.org/datasets/register_datasets",
            type: "POST",
            data: JSON.stringify({ datasets: this.datasets }),
            headers: {
                'X-Api-Key': val
            },
            cache: false,
            timeout: 5000,
            async: false,
            success: function(data) {
                console.log("Versions", data);
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
                // console.log(msg);
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

    _toggle(){
        this.$.toast.toggle();
    }

    showToast(data){
        this.returnDatasets=data.datasets[0];
        this.$.toast.show();
    }

    getExecutionResults(){
        $.ajax({
            crossOrigin:true,
            url: "http://ontosoft.isi.edu:8001/api/KnowledgeCaptureAndDiscovery/MINT-ProvenanceQueries/getAllExecutions?endpoint=http%3A%2F%2Fdisk.isi.edu%3A3030%2Fds%2Fquery",
            type: "GET",
            cache: false,
            timeout: 5000,
            async: false,
            success: function(data) {
                console.log("Versions", data)
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
                // console.log(msg);
            }
        });
    }
}




window.customElements.define('dataset-registration', DatasetRegistration);
