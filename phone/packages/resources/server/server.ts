

setImmediate(() => emit('testEvent'));

onNet('testServerEvent', () => console.log('Client event receieved'));
