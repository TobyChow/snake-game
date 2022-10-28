class Node {
    constructor(val, direction) {
        this.val = val;
        this.direction = direction;
        this.prev = null;
        this.next = null;
    }
}

// Assumes min size of 3;
class Snake {
    constructor(val, direction) {
        const newNode = new Node(val, direction);
        this.head = newNode;
        this.tail = newNode;
        this.size = 1;
    }
    // add node to tail
    grow(val, direction) {
        const newNode = new Node(val, direction);
        newNode.prev = this.tail;
        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.size++;
    }
    move(val, direction) {
        // add new node to head
        // todo destruct
        const newHead = new Node(val, direction);
        this.head.prev = newHead;
        newHead.next = this.head;
        this.head = newHead;
        // remove last node
        [this.tail.prev.next, this.tail.prev, this.tail] = [null, this.tail.prev.prev, this.tail.prev];
    }
    toArray() {
        let arr = [];
        let curr = this.head;
        while(curr) {
            arr.push(curr.val);
            curr = curr.next;
        }
        console.log(arr); // todo remove
        return arr;
    }
}
export default Snake;
