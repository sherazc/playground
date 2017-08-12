<!DOCTYPE html>
<?php
$imageExtentions = array("jpg", "png", "gif", "jpeg", "bmp");

function getFilePath($dir, $file) {
    if ("." == $dir) {
        $filePath = $file;
    } else if(".." == $file) {
        $filePath = $dir;
    } else {

        $filePath = $dir."/".$file;
    }
    return $filePath;
}

function getCurrentDirectory() {
    $dir = ".";
    if (isset($_GET['dir']) && strlen($_GET['dir']) > 0) {
        $dir = $_GET['dir'];
    }
    return $dir;
}

function moveUpDirectory($filePath) {
    $dir = "";
    if (strlen($filePath) > 0 && strpos($filePath, "/") > 0) {
        $dir = substr($filePath, 0, strrpos($filePath, '/'));
    }
    return $dir;
}
function endsWith($haystack, $needle) {
    $haystackLower = strtolower($haystack);
    $needleLower = strtolower($needle);
    $length = strlen($needleLower);
    if ($length == 0) {
        return true;
    }
    return (substr($haystackLower, -$length) === $needleLower);
}

function isImage($filePath) {
    global $imageExtentions;
    $found = false;
    foreach ($imageExtentions as $imageExtention) {
        if (endsWith($filePath, $imageExtention)) {
            $found = true;
            break;
        }
    }
    return $found;
}

function isDirectory($fileName) {
    return $fileName == "." || $fileName == ".." || is_dir($fileName);
}

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CDN Resources</title>
    <style>
        * {
            font-family: Arial;
            font-size: 16px;
            color: #696969;
        }
        a {
            text-decoration: none;
        }
        .container {
            margin: 20px;
        }
        .fileIcon {
            width: 50px;
            border: 0px;
        }
        .addressContainer {

            overflow: hidden;
        }
        .addressLabel {
            font-weight: bold;
            width: 100px;
            float: left;
            padding: 5px;
            margin-bottom: 10px;
        }
        .addressValue {
            border: 1px solid #e6e6e6;
            padding: 5px;
            margin-left: 100px;
        }

        .fileLink {
        }

    </style>
</head>
<body>
<div class="container">
<?php
$dir = getCurrentDirectory();
$address = "/";
if ($dir != "." && strlen($dir) > 1) {
    $address = "/".$dir;
}
?>

<div class="addressContainer">
    <div class="addressLabel">Address: </div>
    <div class="addressValue">
        <?php echo $address; ?>
    </div>
</div>

<?php
$files = scandir($dir, SCANDIR_SORT_ASCENDING);
// Directory Loop
foreach($files as $file) {
    $filePath = getFilePath($dir, $file);
    if(!isDirectory($filePath) || ".images" == $file) {
        continue;
    }
    ?>
    <?php
    if ($file == "." || $filePath == "..") {
        continue;
    } else if($file == "..") {
        if ("." == $dir) {
            continue;
        }
        ?>
        <a href="resources.php?dir=<?php echo moveUpDirectory($filePath);?>" class="fileLink">
            <img src=".images/move_up.png" alt="directory" class="fileIcon"/>
            ..
        </a>
        <?php

    } else {
        ?>
        <a href="resources.php?dir=<?php echo $filePath?>" class="fileLink">
            <img src=".images/dir.png" alt="directory" class="fileIcon"/>

            <?php echo $file;?>
        </a>
        <?php
    }
    ?>
    <hr/>
    <?php
}


// File loop
foreach($files as $file) {

    $filePath = getFilePath($dir, $file);

    if(isDirectory($filePath) || endsWith($file, "php")) {
        continue;
    } else {
        $fileIcon = ".images/file.png";
        $fileIsImage = isImage($filePath);
        if ($fileIsImage) {
            $fileIcon = $filePath;
        }
        ?>
        <a href="<?php echo $filePath?>" target='_blank' class="fileLink">

            <img src="<?php echo $fileIcon?>" alt="directory" class="fileIcon"/>

            <?php echo $file?>
        </a>
        <?php
    }
    ?>
    <hr/>
    <?php

}
?>
</div>
</body>
</html>
