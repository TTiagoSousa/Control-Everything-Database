export default function updatePasswordTemplate(token: string): string {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
          }
          .Container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .Container .Title{
            width: 100%;
            background-color: #162231;
            padding-top: 5px;
            padding-bottom: 5px;
          }
          .Container .Title h1{
            color: #2c7be5;
          }
          .Container .Text{
            width: 100%;
            text-align: center;
          }
          .Container .Text p{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 600;
            color: #344050;
          }
          .Container .Token{
            width: 100%;
            background-color: #162231;
            padding-top: 10px;
            padding-bottom: 10px;
            align-items: center;
          }
          .Container .Token span{
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 600;
            color: #ffffff;
            position: relative;
            width: 50%;
            height: 100%;
            display: inline-block;
            border-radius: 10px;
            background-color: #2c7be5;
            border: none;
            padding: 5px;
          }
          .Container a{
            position: relative;
            width: 50%;
            height: auto;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="Container">
          <div class="Title">
            <h1>Control Everything</h1>
          </div>
          <div class="Text">
            <p>Hellow</p>
            <p>Code to confirm below</p>
          </div>
          <div class="Token">
            <span>
              ${token}
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};