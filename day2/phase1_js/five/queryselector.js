// <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Query Selector Example</title>
    <script src="queryselector.js" defer></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Query Selector Example</h1>
    <div id="content">
        <p class="parah1">Hello, World!</p>
        <p class="para">Welcome to the Query Selector Example.
            <span style="display: none;">This is hidden text.</span>
        </p>
    </div>

    <script>
        const firstTextElement = document.querySelector('.text');
        console.log(firstTextElement.textContent);
        const heading = document.querySelector('h1');
        console.log(heading.textContent);
    </script>
</body>
</html>