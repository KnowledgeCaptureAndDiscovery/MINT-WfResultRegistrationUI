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



class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
    
    
      <div class="card">
      <h4>Select Run ID:</h4>
      <paper-dropdown-menu label="RunIds">
      <paper-listbox slot="dropdown-content" selected="0">
        <paper-item>1</paper-item>
        <paper-item>2</paper-item>
        <paper-item>3</paper-item>
        <paper-item>4</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>
    
      </div>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
