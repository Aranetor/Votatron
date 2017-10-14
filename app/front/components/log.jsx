import React from 'react';

const Log = ({onSubmit, onChange}) => {
  return (
    <div>
      <div className="col-sm-4">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <label>Email :</label>
                  <input type="text" name="email" onChange={onChange} /><br />
                  <label>Password :</label>
                  <input type="text" name="pwd" onChange={onChange} /><br />
                </div>
              </div>
              <div className="col-xs-12">
                <input className="btn btn-primary btn-block" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Log;
