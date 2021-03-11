import React from 'react'

const EnterName = ({handleName}) => {
    return (
        <div class="d-flex vh-100">
            <div class="d-flex w-100 justify-content-center align-self-center">
                <form>
                    <div className="form-group">
                        <input className="form-control" placeholder="Enter your name" type="text" id="name"/>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-info" onClick={e => {
                            e.preventDefault();
                            const name = document.getElementById('name').value;
                            handleName(name);
                        }}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EnterName
