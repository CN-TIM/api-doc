/* eslint strict:0 */
'use strict';
const tools = require('./tools');
const model = require('../models/tag');
const Tag = model.Tag;
const createTag = (name, user) => {
  const now = new Date;
  return {
    name
    , user
    , createAt: now
    , updateAt: now
  };
};
exports.name = 'tag';
exports.get = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return tools.responseFailure(res, 'Invalid id');
  }
  Tag.findById(id).then(tag => tools.responseSuccess(res, tag), err => tools.responseFailure(res, err));
};

exports.pageList = (req, res) => {
  const pageSize = parseInt(req.params.pageSize);
  const currPage = parseInt(req.params.currPage);
  const skip = (currPage - 1) * pageSize;
  Tag.find({
    mark: 0
  }).skip(skip).limit(pageSize).then(users => tools.responseSuccess(res, users), err => tools.responseFailure(res
    , err));
};
exports.totalCount = (req, res) => {
  var query = Tag.find({
    mark: 0
  });
  query.count(function (err, count) {
    tools.responseSuccess(res, count);
  });
};

exports.getByName = (req, res) => {
  const name = req.params.name;
  if (!name) {
    return tools.responseFailure(res, 'Invalid name');
  }
  Tag.find({'name': name,'mark': 0}).then(
    tag => tools.responseSuccess(res, tag),
    err => tools.responseFailure(res, err)
  );
};

exports.getAll = (req, res) => {
  Tag.find({
    mark: 0
  }).then(tags => tools.responseSuccess(res, tags), err => tools.responseFailure(res, err));
};
exports.create = (req, res) => {
  const name = req.body.name;
  const user = req.session.user._id;
  if (!name) {
    return tools.responseFailure(res, 'Invalid name');
  }
  Tag.create(createTag(name, user)).then(tag => tools.responseSuccess(res, tag), err => tools.responseFailure(res
    , err));
};
exports.update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const user = req.body.user;
  const mark = req.body.mark;
  const updateAt = req.body.updateAt || new Date;
  if (!id) {
    return tools.responseFailure(res, 'Invalid id');
  }
  if (!name) {
    return tools.responseFailure(res, 'Invalid name');
  }
  if (!user) {
    return tools.responseFailure(res, 'Invalid user');
  }
  Tag.findByIdAndUpdate(id, {
    name
    , user
    , updateAt
    , mark
  }).then(tag => tools.responseSuccess(res, tag), err => tools.responseFailure(res, err));
};

exports.del = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return tools.responseFailure(res, 'Invalid id');
  }

  Tag.findByIdAndRemove(id).then(
    tag => tools.responseSuccess(res, tag),
    err => tools.responseFailure(res, err)
  );
};

