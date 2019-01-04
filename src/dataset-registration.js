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




class DatasetRegistration extends PolymerElement {
    static get is() { return 'dataset-registration'; }
  static get properties(){
    return {
      obj:Object,
        datasets: Object
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
        
      </style>
    
  
      <div class="card">
     <h1>Select Run ID:</h1>
  <paper-dropdown-menu label="RunIds">
      <paper-listbox slot="dropdown-content" class="dropdown-content"selected="0" on-iron-select="_itemSelected">
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
      
     <div class="card">
     <vaadin-button id="my-button" on-click="registerDataset" raised>Call Register Dataset API</vaadin-button>
</div>

<div class="card">
<iron-form id="form1">
     <form method="get" action="/foo">
      <h4>Dataset Registration Form</h4>
   <paper-input label="Dataset Description" id="desc" name="desc"></paper-input>
       <paper-input label="Dataset Name" id="name" name="datasetName"></paper-input>
    <paper-input label="Provenance Id" id="prov_id" name="prov_id"></paper-input>
    <vaadin-button id="my-button1" on-click="_submitForm" raised>Register Stored Dataset</vaadin-button>
      </form>
   
</div>


 
      <iron-ajax id="session"
        url="https://api.mint-data-catalog.org/get_session_token"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
     <template is="dom-if" if="[[_checkBVal(datasets)]]">
    <div class="card">
    <p>Description: {{datasets.desc}}</p>
    <p>Name: {{datasets.datasetName}}</p>
    <p>Provenance Id: {{datasets.prov_id}}</p>
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
    }

  _itemSelected(e){
    var selectedItem=e.target.selectedItem;
    console.log(selectedItem.innerText);
    this.$.session.generateRequest();

    }

    handleResponse(data){
    console.log(data.detail.response);
   this.obj=data.detail.response;
    console.log(this.obj['X-Api-Key']);
    }

    registerDataset(){
    //this.$.session.generateRequest();
    this.datasets= [{
      "description":"dataset description",
        "name": "dataset name",
        "provenance_id": "your_provenance_id",
        "metadata": {
        "contact_information": {"name": "dcat_user"}
        }
    }];

        console.log(this.obj);
        var val=this.obj['X-Api-Key'];
        $.ajax({
            crossOrigin:true,
            url: "https://api.mint-data-catalog.org/datasets/register_datasets",
            type: "POST",
            data: JSON.stringify({ datasets: this.datasets }),
            headers:{
              'X-Api-Key':val,
            'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'},
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

    _submitForm(event) {
        console.log("Form submitted");
        console.log(this.$.form1.serializeForm());
      //  this.querySelector('.output').innerHTML = JSON.stringify(this.$.form1.favoritePizza);
        this.datasets=this.$.form1.serializeForm();
    }

    _checkBVal(stuff){
        console.log("Found", stuff)
        if(stuff.length === 0){
            return false
        }
        return true
    }
}




window.customElements.define('dataset-registration', DatasetRegistration);
