//todo: use quote
const makePlaceHolders = (vals, initial = 0) =>
  vals.map((v, i) => `\$${i + initial + 1}`);

// @param: string | array
const quote = (params) =>
  Array.isArray(params) ? params.map((param) => `$"{param}"`) : `"${params}"`;

const parseParam = (param) => (Array.isArray(param) ? param.join() : param);

const parseWhereClause = (fields, vals, startIdx = 0) => {
  const placeHolders = makePlaceHolders(vals, startIdx);
  let res = '';
  for (let i = 0; i < fields.length; i++) {
    res += fields[i] + '=' + `${placeHolders[i]}`;
    if (i < fields.length - 1) {
      res += ' and ';
    }
  }
  return res;
};

const addBrackets = (string, length) => (length > 1 ? `(${string})` : string);

// @param columns {Array} [id, name]
// @param values {Array} ['dfd','dfd','dfd']
const prepareInsertStmt = (tableName, columns, values) => {
  let stmt = `insert into ${quote(tableName)} (${parseParam(columns)}) `;
  stmt += `values (${makePlaceHolders(values)}) `;
  stmt += `RETURNING id`;
  return stmt;
};

// @param  where {id:1}
// @returns update table (name1,name2) = ($1,S2) where column1 = $4
const prepareUpdateStmt = (tableName, columns, values, where) => {
  const whereCols = Object.keys(where);
  const whereVals = Object.keys(where); // does not matter, use place holder
  const wherePlaceHolderStartIdx = columns.length;
  console.log(columns.length);
  let stmt = `update ${quote(tableName)} \set ${addBrackets(
    parseParam(columns),
    columns.length
  )}=`;
  stmt += `(${addBrackets(makePlaceHolders(values), columns.length)}) where `;
  stmt += `${parseWhereClause(whereCols, whereVals, wherePlaceHolderStartIdx)}`;
  return stmt;
};

// @param where { id:1, name:'name'}
// @returns select column1, column2 column3 from table
// where column1=$1 and column2 = $2
const prepareSelectStmt = (tableName, selections, where) => {
  let stmt = `select ${parseParam(selections)} from ${quote(tableName)}`;
  if (where) {
    const whereCols = Object.keys(where);
    const whereVals = Object.keys(where); // does not matter, use palce holder
    stmt += ` where ${parseWhereClause(whereCols, whereVals)}`;
  }
  return stmt;
};

const prepareDeleteStmt = (tableName, where) => {
  const whereCols = Object.keys(where);
  const whereVals = Object.keys(where); // does not matter, use place holder
  let stmt = `delete from ${quote(tableName)} `;
  stmt += `where ${parseWhereClause(whereCols, whereVals)} `;
  stmt += `returning id`;
  return stmt;
};

module.exports = {
  prepareInsertStmt,
  prepareSelectStmt,
  prepareUpdateStmt,
  prepareDeleteStmt,
};
