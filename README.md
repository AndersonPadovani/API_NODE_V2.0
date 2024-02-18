<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API_NODE_2.0 Documentation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
        }

        h1, h2, h3 {
            color: #333;
        }

        h2 {
            margin-top: 30px;
        }

        h3 {
            margin-top: 20px;
        }

        pre {
            background-color: #282c34;
            color: #abb2bf;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }

        code {
            color: #61dafb;
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<h1>API_NODE_2.0 Documentation</h1>

<h2>Introduction</h2>
<p>This documentation provides details for the API_NODE_2.0.</p>

<h2>Customer</h2>

<h3>selectAllCustommer</h3>

<ul>
    <li><strong>Method:</strong> GET</li>
    <li><strong>Authentication:</strong> Bearer Token</li>
    <li><strong>Token:</strong> <code>&lt;token&gt;</code></li>
    <li><strong>Request URL:</strong> <code>{{baseUrl}}/user</code></li>
    <li><strong>Request Body:</strong></li>
    <pre>
<code>
{

}
</code>
    </pre>
</ul>

<h3>createCustommer</h3>

<ul>
    <li><strong>Method:</strong> POST</li>
    <li><strong>Request URL:</strong> <code>{{baseUrl}}/user</code></li>
    <li><strong>Request Body:</strong></li>
    <pre>
<code>
{
    "name": "admin",
    "email": "admin@admin.com.br",
    "phone": "(45) 9 9953-0899",
    "password": "1994"
}
</code>
    </pre>
</ul>

<h3>updateCustommer</h3>

<ul>
    <li><strong>Method:</strong> PATCH</li>
    <li><strong>Authentication:</strong> Bearer Token</li>
    <li><strong>Token:</strong> <code>&lt;token&gt;</code></li>
    <li><strong>Request URL:</strong> <code>{{baseUrl}}/user</code></li>
    <li><strong>Request Body:</strong></li>
    <pre>
<code>
{
    "name": "user",
    "phone": "",
    "email": "",
    "password": ""
}
</code>
    </pre>
    <li><strong>Response:</strong> In case of a conflict (status 409), the response will be in JSON format with a <code>message</code> key indicating the reason for the conflict.</li>
    <pre>
<code>
{
    "message": "..."
}
</code>
    </pre>
</ul>

<h3>deleteCustommer</h3>

<ul>
    <li><strong>Method:</strong> DELETE</li>
    <li><strong>Request URL:</strong> <code>{{baseUrl}}/user</code></li>
    <li><strong>Request Body:</strong></li>
    <pre>
<code>
{
    "id": "2a4b81fe-cec8-4096-a943-8c627291540f"
}
</code>
    </pre>
    <li><strong>Response:</strong> In case of a conflict (status 409), the response will be in JSON format with a <code>message</code> key indicating the reason for the conflict.</li>
    <pre>
<code>
{
    "message": "..."
}
</code>
    </pre>
</ul>

<h2>Login</h2>

<h3>loginEmail</h3>

<ul>
    <li><strong>Method:</strong> POST</li>
    <li><strong>Request URL:</strong> <code>{{baseUrl}}/login/email</code></li>
    <li><strong>Request Body:</strong></li>
    <pre>
<code>
{
    "email": "andersonpadovani@protonmail.com",
    "password": "admin"
}
</code>
    </pre>
</ul>

<h3>loginPhone</h3>

<ul>
    <li><strong>Method:</strong> POST</li
