class Animal {
  constructor(public name: string) {}

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog("Billa");
d.speak(); // Billa barks.
