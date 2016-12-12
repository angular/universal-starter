var { Router } = require('express');

let store: Map<string, any> = new Map<string, any>();

function set(key: string, value: any): void {
  store.set(key, value);
}

function get(key: string): string {
  return store.get(key);
}

function remove(key: string): void {
  store.delete(key);
}

function clear(): void {
  store.clear();
}

export let Store = {
  set,
  get,
  remove,
  clear
}

export function createServerStore() {

  var router = Router();

  router.route('/set/:key')
    .get(function(req, res) {
      return res.status(405).json({ error: 'Method not allowed!' });
    })
    .post(function(req, res) {
      let key = req.params.key;
      var data = req.body;
      if (data) {
        set(key, data.value);
        return res.status(200).json({ result: 'SUCCESS' });
      }
      return res.status(405).json({ message: 'Data in body required!' });
    });

  router.route('/get/:key')
    .get(function(req, res) {
      let key = req.params.key;
      let value = get(key);
      if (value) {
        return res.status(200).json({ key: key, value: value });
      }
      return res.status(405).json({ message: 'No value stored for key!' });
    });

  router.route('/remove/:key')
    .get(function(req, res) {
      let key = req.params.key;
      remove(key);
      return res.status(200).json({ result: 'SUCCESS' });
    });

  router.route('/clear')
    .get(function(req, res) {
      clear();
      return res.status(200).json({ result: 'SUCCESS' });
    });

  return router;
};
