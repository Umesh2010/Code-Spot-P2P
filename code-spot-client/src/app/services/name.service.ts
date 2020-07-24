import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  private myName: string;
  private peersNames = new Map<string, string>();
  private animalNames = [
    'Bird',
    'Dog',
    'Donkey',
    'Drever',
    'Earwig',
    'Seal',
    'Penguin',
    'Flamingo',
    'Fossa',
    'Cat',
    'Bear',
    'Lion',
    'Tiger',
    'Snake',
    'Python',
    'Turtle',
    'Frog',
    'Deer',
    'Bat',
    'Horse',
    'Wolf',
    'Squirrel',
    'Giraffe',
    'Leopard',
    'Panda',
    'Gorilla',
    'Raccoon',
    'Owl',
    'Otter',
    'Goat',
    'Shark',
    'Crocodile',
    'Chimpanzee',
    'Koala',
    'Cheetah',
    'Chicken',
    'Duck',
    'Sheep',
    'Sea Lion',
    'Hare',
    'Weasel',
    'Goose',
    'Ostrich',
    'Kangaroo',
    'Armadillo',
    'Falcon',
    'Lizard',
    'Vulture',
    'Bull',
    'Akita',
    'Albatross',
    'Hornet',
    'Avocet',
    'Baboon',
    'Badger',
    'Balinese',
    'Buffalo',
    'Chinchilla',
    'Cichlid',
    'Parrot',
    'Butterfly',
    'Hedgehog',
    'Ant',
    'Spider',
    'Antelope',
    'Lemurs',
    'Hyenas',
    'Mice',
    'Rat',
    'Elephant',
    'Fox',
    'Snail',
    'Fish',
    'Salmon',
    'Fly',
    'Cow',
    'Rabit',
    'Possum',
    'Camel',
    'Chipmunk',
    'Zebra',
    'Mamba',
    'Rhino',
    'Octopus',
    'Monkey',
    'Owl',
    'Aligator',
    'Starfish',
    'Crab',
    'Jellyfish',
    'Ox',
    'Eagle',
    'Woodpecker',
    'Walrus',
  ];

  private adjectives = [
    'Likeable',
    'Amiable',
    'Charming',
    'Polite',
    'Gregarious',
    'Considerate',
    'Generous',
    'Sympathetic',
    'Sincere',
    'Helpful',
    'Patient',
    'Diligent',
    'Organised',
    'Practical',
    'Reliable',
    'Trustworthy',
    'Loyal',
    'Energetic',
    'Adventurous',
    'Enthusiastic',
    'Cheerful',
    'Chatty',
    'Hilarious',
    'Witty',
    'Humorous',
    'Amusing',
    'Ambitious',
    'Determined',
    'Passionate',
    'Decisive',
    'Fearless',
  ];

  giveMyselfRandomName(peerId: string): void {
    const randAnimalIndex = Math.floor(Math.random() * this.animalNames.length);
    const randAdjIndex = Math.floor(Math.random() * this.adjectives.length);
    this.setMyName(
      peerId,
      this.adjectives[randAdjIndex] + ' ' + this.animalNames[randAnimalIndex]
    );
  }

  private setMyName(peerId: string, name: string): void {
    this.myName = name;
    this.setPeerName(peerId, name);
  }

  getMyName(): string {
    return this.myName;
  }

  setPeerName(peerId: string, name: string): void {
    this.peersNames.set(peerId, name);
  }

  getPeerName(peerId: string): string {
    return this.peersNames.get(peerId);
  }
}
