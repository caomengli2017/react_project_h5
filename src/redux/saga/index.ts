import rootPurchase from './purchase';

export default function* rootSage() {
  yield* [...rootPurchase];
}
