import React from "react";
import {CoffeeCalendar} from "./coffee-calendar";
import {createReactWebComponent} from "./wc.util";


customElements.define('coffee-calendar', createReactWebComponent(<CoffeeCalendar  height={500}/>));