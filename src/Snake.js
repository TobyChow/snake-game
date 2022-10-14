class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

// Assumes min size of 3;
class Snake {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    // add node to tail
    grow(val) {
        const newNode = new Node(val);
        newNode.prev = this.tail;
        if (!this.head) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.size++;
    }
    move(val) {
        // add new node to head
        // todo destruct
        const newHead = new Node(val);
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
