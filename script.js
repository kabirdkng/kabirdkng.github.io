const components = {};
eval(document.getElementById('components').textContent);

ReactDOM.render(<components.App />, document.querySelector('#app'));
