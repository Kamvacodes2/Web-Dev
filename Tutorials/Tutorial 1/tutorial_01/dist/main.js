"use strict";
const hello = "world";
// hello = "foo"; isn't allowed, as const are truly const
let hello2 = "world";
hello2 = "foo"; // is allowed as "foo" is the same type as "world" (string)
// hello2 = true; isn't allowed, as you cannot change types
let hello3 = "world";
// hello3 = []
const getFullName = (name, surname) => {
    return `${name} ${surname}`;
};
