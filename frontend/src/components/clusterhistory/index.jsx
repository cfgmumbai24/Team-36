import React from 'react'

const index = () => {
    return (
        <div className="mx-auto col-12 col-md-8 col-lg-6">

            <h2 className="text-center mt-4 mb-4">Medical Personnel Registration</h2>

            <div className="session-tabs">
                <button className={`session-tab${sessionTab === 1 ? "-active" : ""}`} onClick={() => setSessionTab(1)}><p>Pending</p></button>
                <button className={`session-tab${sessionTab === 2 ? "-active" : ""}`} onClick={() => setSessionTab(2)}><p>Approved</p></button>
            </div>

            <hr className='tabs-split'></hr>

            {
                sessionTab === 1 ?

                    ""
                    :

                    ""

            }


        </div>
    )
}

export default index