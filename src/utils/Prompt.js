module.exports = function awaitArgs(message, timeInput, maxInput, filterInput) {
  const filter = filterInput || ((x) => x.author.id === message.author.id);
  const time = timeInput;
  const max = maxInput;
  const collectorInput = {};

  function defineCheck(property, value) {
    if (property) collectorInput[property] = value;
  }

  defineCheck("max", max);
  defineCheck("time", time);

  return message.channel.createMessageCollector(filter, collectorInput);
};
