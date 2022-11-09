# About
Recreate the classic snake game.

Use arrow keys to control the snake's direction.

Gain score by eating food.

Game over when snake collides with itself, or the edge of the board.

# Motivation
To practice React, data structures (doubly linked list), and Big O analysis.

# Project Overview

## Board
The board is a grid represented by coordinates in the form "\<row>-\<column>". For example, the most top left cell has a coordinate of "1-1".

## Snake
The snake uses a doubly linked list (DLL) structure.

The head of the DLL represents the head of the snake. Each node of the DLL represents a section of the snake, and contains the coordinate it should be placed at in the board.

### Moving
To move the snake, a new node is added to the head, and the tail node is removed.

### Eating
When the snake consumes food, a new node is added to the tail of the DLL.

### Storing coordinates of snake cells
A Set is used to store coordinates of the snake's cells.

When searching for a specific value, set is preferred over an array to achieve O(1). This is used in checking for collision with itself.

### Why use a DLL instead of an array or a single linked list?
This is to optimize moving the snake.

Moving the snake involves adding the head of the snake and removal of the tail.

#### Addition of head
In a linked list, addition is O(1), because there is always a reference to the head.

In an array, addition of the first element (arr[0]) is O(n), because the index of each following element in the array is shifted.

#### Removal of tail
In a linked list, removal is O(1) only if there is a tail reference.

In a single linked list, the tail reference is lost after removal. Finding the new tail is O(n).

In a DLL, finding the new tail is O(1), since there is a reference to the previous node.

|  | Array | Single linked list | DLL
| :---: | :---: | :---: | :---: |
| Add Head | O(n) | O(1) | O(1)
| Remove Tail | O(1) | O(n) | O(1)

# Analyzing Time Complexity
| Event | Time Complexity | Space Complexity |
| :---: | :---: | :---: |
| Move | O(1) | O(1) |
| Eat | O(1) | O(1) |
| Collision with board | O(1) | O(1) |
| Collision with itself | O(n) | O(1) |
| Render | O(n) | --- |

# Install
```
> npm i
> npm start
```