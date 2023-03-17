import "./coffee-event.js";
import {getEvents} from "./coffee.dao";

/**
 * A web component that displays a list of events. It accepts an api key and Calendar ID as attributes.
 */
class CoffeeCalendar extends HTMLElement {
  private calendarElement = document.createElement("div");

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
      ._calendar {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height:100%;
        width:100%;
        background: #f5f5f5;
        font-family: "Helvetica Neue",Arial,sans-serif;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      ._calendar::-webkit-scrollbar {
        width: 5px;
      }

      ._calendar::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }

      ._calendar::-webkit-scrollbar-thumb {
        background: #888; 
      }

      ._calendar::-webkit-scrollbar-thumb:hover {
        background: #555; 
      }
      </style>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.calendarElement.classList.add("_calendar");
    this.shadowRoot?.appendChild(this.calendarElement);
    getEvents().then((events) => {
      for (let event of events) {
        const coffeeEvent = document.createElement("coffee-event");
        coffeeEvent.setAttribute("event", JSON.stringify(event));
        this.calendarElement.appendChild(coffeeEvent);
      }
    });
  }

  get apiKey() {
    return this.getAttribute("apiKey");
  }

  get calendarId() {
    return this.getAttribute("calendarId");
  }
}

// Define the new custom element
customElements.define("coffee-calendar", CoffeeCalendar);
