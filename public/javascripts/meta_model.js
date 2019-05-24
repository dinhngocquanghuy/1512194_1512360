function Windows()
{
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.link_background = '';
}

function Section()
{
  this.id = '';
  this.class = '';
  this.order = 0;
  this.x = 0;//xác định dựa theo vị trí của windows
  this.y = 0;//relative
  this.width = 0;
  this.height = 0;
  this.content =[];
}

//button, checkbox, input sẽ tạo ra các lớp Button, Checkbox, Input tương ứng và kế thừa lớp này
function Control()
{
  this.id = '';
  this.class = '';
  this.belong_to = {}; //xác định bằng id hoặc class của section, cú pháp gán belong_to['id'] = 'abc' hoặc belong_to['class'] = 'abc';
  this.x = 0;//xác định dựa theo vị trí của section
  this.y = 0;//relative
}

function Button()
{
  this.super_ = Control;
  this.class = 'btn-default active';
}
