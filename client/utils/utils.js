import eventEmitter from 'event-emitter';
const emitter = eventEmitter({});

export function route (path, state) {
  emit('route', path, state);
}

export function emit(...args) {
  emitter.emit(...args);
}

export function onEmit(eventName, cb) {
  emitter.on(eventName, cb);
}
