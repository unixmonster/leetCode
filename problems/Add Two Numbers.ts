
// Needed to make vscode not bitch about reassigning values.
export { };

/**
 * Definition for singly-linked list. */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    let newNode = new ListNode;
    let carry = 0;
    let result = newNode;
    let l1cursor = l1;
    let l2cursor = l2;
    let newCursor = newNode;

    while (l1cursor || l2cursor) {

        newCursor.val = (l1cursor?.val || 0) + (l2cursor?.val || 0) + carry;

        carry = 0;

        if (newCursor.val > 9) {
            carry = 1;
            newCursor.val = newCursor.val - 10;
        }

        l1cursor = l1cursor?.next || null;
        l2cursor = l2cursor?.next || null;

        if (l1cursor || l2cursor) {
            let newNode = new ListNode;
            newCursor.next = newNode;
            newCursor = newCursor.next;

        } else {
            if (carry > 0) {
                let newNode = new ListNode;
                newCursor.next = newNode;
                newCursor = newCursor.next;
                newCursor.val = carry;
            }
        }

    }

    return result;

};