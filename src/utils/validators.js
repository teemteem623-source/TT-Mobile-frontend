export const validateRegister = ({
  username,
  fullname,
  email,
  pass,
  confirm_password,
}) => {
  const errors = {};
  if (!username) {
    errors.username = "Vui lòng nhập tên đăng nhập";
  }
  if (!fullname) {
    errors.fullname = "Vui lòng nhập họ tên";
  }
  if (!email) {
    errors.email = "Vui lòng nhập email";
  }
  if (!pass) {
    errors.pass = "Vui lòng nhập mật khẩu";
  } else if (pass.length < 6) {
    errors.pass = "Mật khẩu phải >= 6 ký tự";
  }
  if (!confirm_password) {
    errors.confirm_password = "Vui lòng nhập lại mật khẩu";
  } else if (pass !== confirm_password) {
    errors.confirm_password = "Mật khẩu không khớp";
  }
  return errors;
};
export const validateLogin = ({ username, pass }) => {
  const errors = {};

  if (!username || username.trim() === "") {
    errors.username = "Vui lòng nhập tên đăng nhập";
  }

  if (!pass || pass.trim() === "") {
    errors.pass = "Vui lòng nhập mật khẩu";
  } else if (pass.length < 6) {
    errors.pass = "Mật khẩu phải >= 6 ký tự";
  }

  return errors;
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const validateProduct = (data) => {
  const errors = {};

  // product_name
  if (!data.product_name || data.product_name.trim() === "") {
    errors.product_name = "Vui lòng nhập tên sản phẩm";
  } else if (data.product_name.length > 100) {
    errors.product_name = "Tên sản phẩm tối đa 100 ký tự";
  }

  // alias
  if (!data.alias || data.alias.trim() === "") {
    errors.alias = "Vui lòng nhập alias";
  } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
    errors.alias = "Alias chỉ chứa chữ thường, số và dấu -";
  } else if (data.alias.length > 100) {
    errors.alias = "Alias tối đa 100 ký tự";
  }

  // price
  if (data.price === undefined || data.price === null || data.price === "") {
    errors.price = "Vui lòng nhập giá";
  } else if (isNaN(data.price) || Number(data.price) < 0) {
    errors.price = "Giá phải lớn hơn hoặc bằng 0";
  }

  // sale_price
  if (
    data.sale_price !== undefined &&
    data.sale_price !== null &&
    data.sale_price !== ""
  ) {
    if (isNaN(data.sale_price) || Number(data.sale_price) < 0) {
      errors.sale_price = "Giá khuyến mãi không hợp lệ";
    } else if (Number(data.sale_price) > Number(data.price)) {
      errors.sale_price = "Giá khuyến mãi phải nhỏ hơn hoặc bằng giá";
    }
  }

  // image (chỉ check chuỗi)
  // if (data.image && typeof data.image !== "string") {
  //   errors.image = "Ảnh không hợp lệ";
  // }

  // cat_id
  if (!data.cat_id || !Number.isInteger(data.cat_id) || data.cat_id <= 0) {
    errors.cat_id = "Danh mục không hợp lệ";
  }

  // brand_id
  if (
    !data.brand_id ||
    !Number.isInteger(data.brand_id) ||
    data.brand_id <= 0
  ) {
    errors.brand_id = "Thương hiệu không hợp lệ";
  }

  // detail (optional)
  if (data.detail && typeof data.detail !== "string") {
    errors.detail = "Mô tả chi tiết không hợp lệ";
  }

  // trash
  if (data.trash !== undefined && ![0, 1].includes(data.trash)) {
    errors.trash = "Trash chỉ nhận 0 hoặc 1";
  }

  // status
  if (![0, 1].includes(data.status)) {
    errors.status = "Trạng thái không hợp lệ";
  }

  // launch_date
  if (!data.launch_date) {
    errors.launch_date = "Vui lòng nhập ngày ra mắt";
  } else if (isNaN(Date.parse(data.launch_date))) {
    errors.launch_date = "Ngày ra mắt không hợp lệ";
  }

  // tag
  if (!data.tag || data.tag.trim() === "") {
    errors.tag = "Vui lòng nhập tag";
  } else if (data.tag.length > 255) {
    errors.tag = "Tag tối đa 255 ký tự";
  }

  // view
  if (data.view !== undefined) {
    if (!Number.isInteger(data.view) || data.view < 0) {
      errors.view = "View phải là số nguyên >= 0";
    }
  }

  // summary
  if (data.summary && data.summary.length > 100) {
    errors.summary = "Mô tả ngắn tối đa 100 ký tự";
  }

  return errors;
};
