const { Order, Client, Product } = require('../models');
const { setResponse } = require('../utils');

const router = require('express').Router();

const evaluateItems = async (items) => {
  try {
    const all = [];
    for (let i = 0; i < items.length; i++) {
      const id = items[i].pid;
      if (!all.includes(id)) {
        all.push(id);
      }
    }
    const obj = {};
    all.map((i) => {
      obj[i] = 0;
    });
    for (let i = 0; i < all.length; i++) {
      const getItem = await Product.findOne({ _id: all[i] });
      obj[all[i]] = getItem.quantity;
    }
    items.map((i) => {
      obj[i.pid] -= i.quantity;
    });
    Object.keys(obj).map(async (i) => {
      await Product.updateOne({ _id: i }, { $set: { quantity: obj[i] } });
    });
  } catch {}
};

router.get('/', async (req, res) => {
  try {
    const query = await Order.find({});
    if (query) {
      return setResponse(res, 'success', query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const query = await Order.findOne({ _id: req.params.id });
    if (query) {
      return setResponse(res, 'success', query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { client_name, client_phone, client_address, items } = req.body;

    const newData = new Order({
      client_name,
      client_phone,
      client_address,
      items,
      status: 'new',
    });
    console.log(items);
    await evaluateItems(items);
    const clientExist = await Client.findOne({ client_phone });
    if (!clientExist) {
      const newClient = new Client({
        client_name,
        client_phone,
        client_address,
      });
      await newClient.save();
    }
    const query = await newData.save();
    if (query) {
      return setResponse(res, 'success', query, 200);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.put('/:id/:status', async (req, res) => {
  try {
    const data = { status: req.params.status };
    console.log(data);
    const query = await Order.updateOne({ _id: req.params.id }, { $set: data });
    if (query.matchedCount > 0) {
      return setResponse(res, 'success', null, 200);
    } else if (query.matchedCount < 1) {
      return setResponse(res, 'resource not found', null, 404);
    } else {
      return setResponse(res, 'unable to update', null, 500);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const query = await Order.deleteOne({ _id: req.params.id });
    if (query.deletedCount > 0) {
      return setResponse(res, 'success', query, 200);
    } else if (query.matchedCount < 1) {
      return setResponse(res, 'resource not found', null, 404);
    } else {
      return setResponse(res, 'unable to delete', null, 500);
    }
  } catch (error) {
    return setResponse(res, error, null, 500);
  }
});

module.exports = { orders: router };
