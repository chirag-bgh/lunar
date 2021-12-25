Moralis.Cloud.define("helloworld", async (request) => {
  // const Subscription = Moralis.Object.extend("Subscription");
  // const subscription = new Subscription();
  // const logger = Moralis.Cloud.getLogger();
  // logger.info("Hello World");
  // logger.info("Request: ", request);

  //  subscription.set("user", request.params.user);
  //  subscription.set("status", request.params.status);
  //  subscription.set("product", request.params.product);

  //  let x = subscription.save();

  return "Hello World";
});
