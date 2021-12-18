import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default function downloadContent(content, title, displayName) {
  console.log(content)
  const finalMarkup = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&display=swap');
        body {
            padding: 0 10%;
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            min-height: calc(100vh - 100px);
        }
          blockquote {
            background: rgb(89, 39, 233, 0.1);
            padding: 10px 30px;
            border-radius: 6px;
            font-size: 0.8rem;
            line-height: 1.2rem;
          }
    
          code {
            background: rgb(107, 107, 107, 0.5);
            padding: 3px;
            border-radius: 3px;
          }
          .hr {
            border: none;
            border-top: 1px solid rgba(0,0,0,0.16);
          }
          .main-title {
              text-align: center;
              font-size: 3rem;
              font-weight: 900;
          }
          
        img {
            width: 100%;
            display: inline-block;
            height: auto;
          }
          footer {
            width: 100%;
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer small {
            color: #000;
          }
        </style>
        <title>${title}</title>
      </head>
      <body>
          <h1 class="main-title">${title}</h1>
          <hr class="hr" />
          ${content}
          <hr class="hr" />
          <footer>
          <small>&copy; Copyright ${new Date().getFullYear()}, ${displayName}</small>
          </footer>
      </body>
    </html>
    `;
  let zip = new JSZip();
  zip.file("Content/index.html", finalMarkup);
  zip.file("Content/README.md", title);
  zip.generateAsync({ type: "blob" }).then(function (content) {
    FileSaver.saveAs(content, "download.zip");
  });
}