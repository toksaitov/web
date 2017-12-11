<?php
$server = '127.0.0.1';
$login  = 'femdb_user';
$password = '';
$database = 'femdb';

$connection = new mysqli($server, $login, $password, $database);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$data = htmlspecialchars($_GET["data"]);
if ($data === 'nodes') {
    $sql = 'SELECT id, x, y FROM nodes';
    $result = $connection->query($sql);

    header('Content-Type: application/json');

    $row_count = $result->num_rows;
    if ($row_count > 0) {
        echo '[';
        while($row = $result->fetch_assoc()) {
            echo '{"id":' . $row['id'] . ',"x":' . $row['x'] . ',"y":' . $row["y"] . '}';

            --$row_count;
            if ($row_count !== 0) {
                echo ',';
            }
        }
        echo ']';
    } else {
        echo "[]";
    }
} elseif ($data === 'nodes-array') {
    $sql = 'SELECT id, x, y FROM nodes';
    $result = $connection->query($sql);

    header('Content-Type: application/json');

    $row_count = $result->num_rows;
    if ($row_count > 0) {
        echo '[';
        while($row = $result->fetch_assoc()) {
            echo '[' . $row['x'] . ',' . $row["y"] . ']';

            --$row_count;
            if ($row_count !== 0) {
                echo ',';
            }
        }
        echo ']';
    } else {
        echo "[]";
    }    
} elseif ($data === 'links') {
    $sql = <<<END
SELECT e.id, n1.x as x1, n1.y as y1, n2.x as x2, n2.y as y2, n3.x as x3, n3.y as y3
FROM elements as e
    INNER JOIN nodes as n1 on e.n1 = n1.id
    INNER JOIN nodes as n2 on e.n2 = n2.id
    INNER JOIN nodes as n3 on e.n3 = n3.id;
END;

    $result = $connection->query($sql);

    header('Content-Type: application/json');

    $row_count = $result->num_rows;
    if ($row_count > 0) {
        echo '[';
        while($row = $result->fetch_assoc()) {
            echo '{"id":' . $row['id'] . ',' .
                  '"x1":' . $row['x1'] . ',"y1":' . $row["y1"] . ',' .
                  '"x2":' . $row['x2'] . ',"y2":' . $row["y2"] . ',' .
                  '"x3":' . $row['x3'] . ',"y3":' . $row["y3"] . '}';

            --$row_count;
            if ($row_count !== 0) {
                echo ',';
            }
        }
        echo ']';
    } else {
        echo "[]";
    }
}

$connection->close();
?>

