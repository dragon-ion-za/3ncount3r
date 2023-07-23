import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {

    fetch("http://localhost:4202/_framework/blazor.webassembly.js").then(
      (response) => {
        if (response.ok) {
          response.text().then(
            (text) => {
              var scriptContent = text;
              scriptContent = scriptContent.replaceAll("_framework/",
              "http://localhost:4202/_framework/");

              scriptContent = scriptContent.replaceAll("_content/",
              "http://localhost:4202/_content/");
      
              scriptContent = scriptContent.replaceAll("credentials:\"include\",", "");
        
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.innerHTML = scriptContent;
        
              document.head.appendChild(script);

              script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = "_content/MudBlazor/MudBlazor.min.js";
        
              document.head.appendChild(script);

              var link = document.createElement('link');
              link.rel = "stylesheet";
              link.href = "_content/MudBlazor/MudBlazor.min.css";
        
              document.head.appendChild(link);
            }
          );
        }
      }
    );

    const title = 'spa-charact3r';
    this.innerHTML = `<div id="app"></div><app-main></app-main>`;
  }
}
customElements.define('spa-charact3r-app', AppElement);
