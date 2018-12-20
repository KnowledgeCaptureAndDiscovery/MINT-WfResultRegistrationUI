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



class MyView1 extends PolymerElement {

  static get properties(){
    return {
      obj:Object
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
      
      <div class="card">
      <h4> Your X-API-Key is </h4>{{obj.X-Api-Key}}
    </div>
      
     
      
      <iron-ajax id="session"
        url="https://api.mint-data-catalog.org/get_session_token"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
    `;
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

}

window.customElements.define('my-view1', MyView1);
